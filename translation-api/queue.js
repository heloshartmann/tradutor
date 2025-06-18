const amqp = require('amqplib');
const { rabbitmqUrl } = require('./config');

async function sendToQueue(message) {
  const connection = await amqp.connect(rabbitmqUrl);
  const channel = await connection.createChannel();
  await channel.assertQueue('translation_queue');
  channel.sendToQueue('translation_queue', Buffer.from(JSON.stringify(message)));
  setTimeout(() => connection.close(), 500);
}

module.exports = sendToQueue;