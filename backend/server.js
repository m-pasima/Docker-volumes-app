const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const DATA_FILE = '/data/contacts.json';

app.use(cors());
app.use(express.json());

// Simple liveness endpoint (200 OK)
app.get('/healthz', (_req, res) => res.status(200).json({ ok: true }));

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    let contacts = [];
    if (!err && data) {
      try { contacts = JSON.parse(data); } catch { contacts = []; }
    }
    contacts.push({ name, email, message, timestamp: new Date().toISOString() });

    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 2), (err2) => {
      if (err2) return res.status(500).json({ error: 'Failed to save data' });
      res.json({ status: 'ok' });
    });
  });
});

app.get('/api/contacts', (_req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.json([]);
    try { res.json(JSON.parse(data)); } catch { res.json([]); }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
