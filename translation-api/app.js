const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Translation = require('./db');
const sendToQueue = require('./queue');

const app = express();
app.use(express.json());

app.post('/translations', async (req, res) => {
  const { text, targetLanguage } = req.body;
  const requestId = uuidv4();

  await Translation.create({
    requestId,
    status: 'queued',
    originalText: text,
    targetLanguage
  });

  await sendToQueue({ requestId, text, targetLanguage });

  res.status(202).json({ message: 'Translation queued', requestId });
});

app.get('/translations/:requestId', async (req, res) => {
  const translation = await Translation.findOne({ requestId: req.params.requestId });
  if (!translation) return res.status(404).json({ error: 'Not found' });

  res.json({
    status: translation.status,
    translatedText: translation.translatedText || null
  });
});

app.listen(3000, () => console.log('API listening on port 3000'));