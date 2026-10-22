import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import PageHero from '../components/PageHero';
import { site } from '../data/site';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { submitContact, validate, type ContactPayload, type FieldErrors } from '../services/contact';

const empty: ContactPayload = { name: '', email: '', phone: '', message: '' };

export default function Contact() {
  useDocumentMeta('Contact Us', `Reach out to ${site.name} in Kolkata, India.`);
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [failure, setFailure] = useState('');
  const [trap, setTrap] = useState('');

  const change = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;
    if (trap) return; // honeypot: bots fill the hidden field
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus('sending');
    try {
      await submitContact(values, trap);
      setValues(empty);
      setStatus('sent');
    } catch (err) {
      setFailure(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('failed');
    }
  }

  return (
    <>
      <PageHero
        title="Reach Out to Alsvid"
        intro="Connect with us via phone, email, or social platforms. We're here to assist you with IT services and training."
      />

      <section className="section">
        <div className="container contact-grid">
          {/* Form Column */}
          <div className="contact-form-card">
            <h2>Send Us a Message</h2>
            <p className="contact-form-sub">
              Fill out the form below and our team will get back to you shortly.
            </p>

            {status === 'sent' && (
              <p className="notice ok" role="status">
                ✓ Message received! We will reply to your email address promptly.
              </p>
            )}
            {status === 'failed' && (
              <p className="notice bad" role="alert">
                {failure} You can also reach us directly at{' '}
                <a href={`mailto:${site.email}`}>{site.email}</a> or call{' '}
                <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>.
              </p>
            )}

            <form onSubmit={onSubmit} noValidate className="form">
              <div className="field">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={values.name}
                  onChange={change}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-err' : undefined}
                />
                {errors.name && <span id="name-err" className="err">{errors.name}</span>}
              </div>

              <div className="field">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={values.email}
                  onChange={change}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-err' : undefined}
                />
                {errors.email && <span id="email-err" className="err">{errors.email}</span>}
              </div>

              <div className="field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98300 00000"
                  value={values.phone}
                  onChange={change}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-err' : undefined}
                />
                {errors.phone && <span id="phone-err" className="err">{errors.phone}</span>}
              </div>

              <div className="field">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your IT support needs or training inquiries..."
                  value={values.message}
                  onChange={change}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-err' : undefined}
                />
                {errors.message && <span id="message-err" className="err">{errors.message}</span>}
              </div>

              {/* Honeypot anti-spam */}
              <div className="hp" aria-hidden="true">
                <label>
                  Leave blank
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={trap}
                    onChange={e => setTrap(e.target.value)}
                  />
                </label>
              </div>

              <button className="btn btn-primary btn-submit" type="submit" disabled={status === 'sending'}>
                <Send size={16} aria-hidden />
                <span>{status === 'sending' ? 'Sending Message…' : 'Submit Message'}</span>
              </button>
            </form>
          </div>

          {/* Details Sidebar Column */}
          <div className="contact-info-col">
            <div className="contact-card">
              <h3>Direct Contact Details</h3>
              <p>Reach out directly for immediate support or enrollment consultations:</p>

              <div className="contact-detail-items">
                <a href={`tel:${site.phone}`} className="contact-detail-item">
                  <div className="contact-icon-box">
                    <Phone size={20} />
                  </div>
                  <div>
                    <strong>Phone Helpline</strong>
                    <span>{site.phoneDisplay}</span>
                  </div>
                </a>

                <a href={`mailto:${site.email}`} className="contact-detail-item">
                  <div className="contact-icon-box">
                    <Mail size={20} />
                  </div>
                  <div>
                    <strong>Email Support</strong>
                    <span>{site.email}</span>
                  </div>
                </a>

                <div className="contact-detail-item">
                  <div className="contact-icon-box">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <strong>Registered Office</strong>
                    <span>{site.address}</span>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-icon-box">
                    <Clock size={20} />
                  </div>
                  <div>
                    <strong>Operating Hours</strong>
                    <span>Monday - Saturday: 9:30 AM - 6:30 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <h3>Connect on Social Media</h3>
              <p>Follow Alsvid Infocom for event updates, placement news, and training schedules:</p>
              <div className="social-pill-list">
                <a
                  href={site.socials.facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="social-pill"
                >
                  Facebook
                </a>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="social-pill"
                >
                  LinkedIn
                </a>
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="social-pill"
                >
                  Instagram
                </a>
                <a
                  href={site.socials.twitter}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="social-pill"
                >
                  X (Twitter)
                </a>
                <a
                  href={site.socials.youtube}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="social-pill"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
