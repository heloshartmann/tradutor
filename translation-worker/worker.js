const Translation = require('./db');
const consumeMessages = require('./queue');

async function fakeTranslate(text, targetLanguage) {
  return `${text} [translated to ${targetLanguage}]`;
}

async function processMessage({ requestId, text, targetLanguage }) {
  try {
    await Translation.updateOne(
      { requestId },
      { status: 'processing', updatedAt: new Date() }
    );

    const translatedText = await fakeTranslate(text, targetLanguage);

    await Translation.updateOne(
      { requestId },
      {
        status: 'completed',
        translatedText,
        updatedAt: new Date()
      }
    );
    console.log(`Processed translation for ${requestId}`);
  } catch (err) {
    console.error(`Failed translation for ${requestId}`, err);
    await Translation.updateOne(
      { requestId },
      { status: 'failed', updatedAt: new Date() }
    );
  }
}

consumeMessages(processMessage);