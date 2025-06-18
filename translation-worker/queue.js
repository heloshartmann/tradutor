const amqp = require('amqplib');
const { rabbitmqUrl } = require('./config');

async function consumeMessages(callback) {
  const connection = await amqp.connect(rabbitmqUrl);
  const channel = await connection.createChannel();
  await channel.assertQueue('translation_queue');
  channel.consume('translation_queue', async (msg) => {
    if (msg !== null) {
      const content = JSON.parse(msg.content.toString());
      await callback(content);
      channel.ack(msg);
    }
  });
}

module.exports = consumeMessages;