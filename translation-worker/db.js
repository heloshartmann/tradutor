const mongoose = require('mongoose');
const { mongoUrl } = require('./config');

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const translationSchema = new mongoose.Schema({
  requestId: String,
  status: String,
  originalText: String,
  translatedText: String,
  targetLanguage: String,
  createdAt: Date,
  updatedAt: Date
});

const Translation = mongoose.model('Translation', translationSchema);

module.exports = Translation;