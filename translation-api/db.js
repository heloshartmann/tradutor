const mongoose = require('mongoose');
const { mongoUrl } = require('./config');

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const translationSchema = new mongoose.Schema({
  requestId: String,
  status: String,
  originalText: String,
  translatedText: String,
  targetLanguage: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Translation = mongoose.model('Translation', translationSchema);

module.exports = Translation;