export interface ContactPayload { name: string; email: string; phone: string; message: string }
export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

export function validate(v: ContactPayload): FieldErrors {
  const e: FieldErrors = {};
  if (v.name.trim().length < 2) e.name = 'Enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email address, like name@example.com.';
  const digits = v.phone.replace(/[\s()+-]/g, '');
  if (v.phone.trim() && !/^\d{7,15}$/.test(digits)) e.phone = 'Enter 7 to 15 digits, or leave this blank.';
  if (v.message.trim().length < 10) e.message = 'Write at least 10 characters so we can help.';
  return e;
}

const endpoint = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || '/api/contact';

// Success is only returned when the endpoint accepted the request.
export async function submitContact(p: ContactPayload, honeypot = ''): Promise<void> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...p, website: honeypot }),
  });
  if (!res.ok) {
    let message = 'Your message was not sent. Please try again in a moment.';
    try {
      const body: { error?: unknown } = await res.json();
      if (typeof body.error === 'string') message = body.error;
    } catch {
      // Keep the generic message when the API response is not JSON.
    }
    throw new Error(message);
  }
}
