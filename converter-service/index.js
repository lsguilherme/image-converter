import sharp from "sharp";
import zmq from "zeromq";
import amqplib from 'amqplib';

(async () => {
  const queueAPI = 'tasksAPI';
  const queueConverter = 'tasksConverter';
  const conn = await amqplib.connect('amqp://localhost:5672');

  const ch1 = await conn.createChannel();
  const ch2 = await conn.createChannel();
  await ch1.assertQueue(queueConverter);

  // Listener
  await ch1.consume(queueConverter, (msg) => {
    if (msg !== null) {
      sharp(msg.content)
        .jpeg()
        .toBuffer()
        .then((data) => {
          ch2.sendToQueue(queueAPI, data);
        })
        .catch((err) => {
          console.log(queueAPI, err);
        });
      ch1.ack(msg);
    } else {
      ch2.sendToQueue(queueAPI, 'Consumer cancelado pelo servidor');
    }
  });
})();
