import 'dotenv/config';
import { createServer } from 'node:http';
import nodemailer from 'nodemailer';
import { createApp } from './app.js';

const port = Number(process.env.PORT || 3001);
const proxyHops = Number(process.env.TRUST_PROXY || 0);
const allowedOrigins = (process.env.CONTACT_ALLOWED_ORIGINS || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}
if (!Number.isInteger(proxyHops) || proxyHops < 0) {
  throw new Error('TRUST_PROXY must be a non-negative integer.');
}

const smtpHost = process.env.SMTP_HOST;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpPort = Number(process.env.SMTP_PORT || 587);
if (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535) {
  throw new Error('SMTP_PORT must be an integer between 1 and 65535.');
}

const transporter = smtpHost && smtpUser && smtpPass
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: smtpUser, pass: smtpPass },
    })
  : null;

const app = createApp({ transporter, allowedOrigins });
if (proxyHops > 0) app.set('trust proxy', proxyHops);

createServer(app).listen(port, () => {
  console.log(`Contact API listening on port ${port}`);
  if (!transporter) console.warn('SMTP is not configured; contact submissions will receive HTTP 503.');
});