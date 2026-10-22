import cors from 'cors';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const distPath = fileURLToPath(new URL('../dist/', import.meta.url));
const indexPath = path.join(distPath, 'index.html');

function validateContact(body) {
  const errors = {};
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { values: null, errors: { form: 'Submit a valid contact request.' } };
  }

  const values = {
    name: typeof body.name === 'string' ? body.name.trim() : '',
    email: typeof body.email === 'string' ? body.email.trim() : '',
    phone: typeof body.phone === 'string' ? body.phone.trim() : '',
    message: typeof body.message === 'string' ? body.message.trim() : '',
  };

  if (values.name.length < 2 || values.name.length > 100) {
    errors.name = 'Enter a name between 2 and 100 characters.';
  }
  if (values.email.length > 254 || !emailPattern.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (values.phone) {
    const digits = values.phone.replace(/\D/g, '');
    if (!/^[+\d().\s-]+$/.test(values.phone) || digits.length < 7 || digits.length > 15) {
      errors.phone = 'Enter a valid phone number or leave this blank.';
    }
  }
  if (values.message.length < 10 || values.message.length > 5000) {
    errors.message = 'Enter a message between 10 and 5000 characters.';
  }

  return { values, errors };
}

function createRateLimiter({ windowMs = 15 * 60 * 1000, max = 5 } = {}) {
  const requests = new Map();

  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip || req.socket.remoteAddress || 'unknown';
    let record = requests.get(key);

    if (!record || now >= record.resetAt) {
      record = { count: 0, resetAt: now + windowMs };
      requests.set(key, record);
    }

    record.count += 1;
    if (record.count > max) {
      res.set('Retry-After', String(Math.max(1, Math.ceil((record.resetAt - now) / 1000))));
      return res.status(429).json({ ok: false, error: 'Too many messages. Please try again later.' });
    }

    if (requests.size > 10000) {
      for (const [ip, entry] of requests) {
        if (now >= entry.resetAt) requests.delete(ip);
      }
    }
    return next();
  };
}

export function createApp({
  transporter,
  allowedOrigins = [],
  rateLimit,
  fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER,
} = {}) {
  const app = express();
  app.disable('x-powered-by');

  if (allowedOrigins.length) {
    app.use(cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        const error = new Error('Origin not allowed.');
        error.status = 403;
        return callback(error);
      },
    }));
  }

  app.use(express.json({ limit: '16kb' }));
  app.get('/api/health', (_req, res) => res.json({ ok: true, emailConfigured: Boolean(transporter) }));
  app.post('/api/contact', createRateLimiter(rateLimit), async (req, res, next) => {
    if (typeof req.body?.website === 'string' && req.body.website.trim()) {
      return res.status(202).json({ ok: true });
    }

    const { values, errors } = validateContact(req.body);
    if (Object.keys(errors).length) {
      return res.status(400).json({ ok: false, errors });
    }
    if (!transporter) {
      return res.status(503).json({ ok: false, error: 'Contact email is not configured.' });
    }

    try {
      await transporter.sendMail({
        from: fromAddress,
        to: process.env.CONTACT_TO || 'info@alsvidinfo.com',
        replyTo: values.email,
        subject: `Website contact from ${values.name}`,
        text: [
          `Name: ${values.name}`,
          `Email: ${values.email}`,
          `Phone: ${values.phone || 'Not provided'}`,
          '',
          'Message:',
          values.message,
        ].join('\n'),
      });
      return res.status(202).json({ ok: true });
    } catch (error) {
      console.error('Contact email delivery failed:', {
        code: error.code || 'unknown',
        responseCode: error.responseCode || null,
        command: error.command || null,
      });
      return res.status(502).json({
        ok: false,
        error: 'Email delivery failed. Check the SMTP settings or try again later.',
      });
    }
  });

  app.use(express.static(distPath));
  app.get('/{*path}', (req, res, next) => {
    if (req.path === '/api' || req.path.startsWith('/api/')) return next();
    return res.sendFile(indexPath, error => {
      if (error) next(error);
    });
  });

  app.use((req, res) => res.status(404).json({ ok: false, error: 'Not found.' }));
  app.use((error, _req, res, _next) => {
    if (error.status === 403) {
      return res.status(403).json({ ok: false, error: error.message });
    }
    if (error.type === 'entity.too.large') {
      return res.status(413).json({ ok: false, error: 'Request is too large.' });
    }
    if (error instanceof SyntaxError && error.status === 400) {
      return res.status(400).json({ ok: false, error: 'Request body must be valid JSON.' });
    }
    console.error('Contact API request failed:', error);
    return res.status(500).json({ ok: false, error: 'Message could not be sent. Please try again later.' });
  });

  return app;
}