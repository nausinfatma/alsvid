import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { createServer } from 'node:http';
import { createApp } from './app.js';

const servers = new Set();

async function startApi(options) {
  const server = createServer(createApp(options));
  servers.add(server);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return `http://127.0.0.1:${server.address().port}`;
}

afterEach(async () => {
  await Promise.all([...servers].map(server => new Promise(resolve => server.close(resolve))));
  servers.clear();
});

const validMessage = {
  name: 'Asha Das',
  email: 'asha@example.com',
  phone: '+91 98300 32339',
  message: 'I would like to know more about your services.',
};

test('valid contact request is sent and acknowledged', async () => {
  const sent = [];
  const baseUrl = await startApi({
    transporter: { sendMail: async message => sent.push(message) },
    fromAddress: 'website@alsvidinfocom.com',
  });
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(validMessage),
  });

  assert.equal(response.status, 202);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(sent.length, 1);
  assert.equal(sent[0].from, 'website@alsvidinfocom.com');
  assert.equal(sent[0].replyTo, validMessage.email);
  assert.match(sent[0].text, /I would like to know more/);
});

test('invalid contact fields are rejected without sending email', async () => {
  let sendCount = 0;
  const baseUrl = await startApi({ transporter: { sendMail: async () => { sendCount += 1; } } });
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...validMessage, email: 'not-an-email', message: 'short' }),
  });

  assert.equal(response.status, 400);
  assert.deepEqual(Object.keys((await response.json()).errors).sort(), ['email', 'message']);
  assert.equal(sendCount, 0);
});

test('honeypot submissions are silently accepted without sending email', async () => {
  let sendCount = 0;
  const baseUrl = await startApi({ transporter: { sendMail: async () => { sendCount += 1; } } });
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...validMessage, website: 'filled-by-bot' }),
  });

  assert.equal(response.status, 202);
  assert.equal(sendCount, 0);
});

test('unconfigured SMTP fails explicitly instead of reporting success', async () => {
  const baseUrl = await startApi({});
  const health = await fetch(`${baseUrl}/api/health`);
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(validMessage),
  });

  assert.deepEqual(await health.json(), { ok: true, emailConfigured: false });
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, false);
});

test('mail provider failures return a clear delivery error', async () => {
  const baseUrl = await startApi({
    transporter: { sendMail: async () => { throw Object.assign(new Error('provider unavailable'), { code: 'ECONNECTION' }); } },
  });
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(validMessage),
  });

  assert.equal(response.status, 502);
  assert.match((await response.json()).error, /Email delivery failed/);
});

test('contact requests are rate limited', async () => {
  const baseUrl = await startApi({
    transporter: { sendMail: async () => {} },
    rateLimit: { max: 1, windowMs: 60_000 },
  });
  const send = () => fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(validMessage),
  });

  assert.equal((await send()).status, 202);
  const limited = await send();
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.headers.get('retry-after')) > 0);
});