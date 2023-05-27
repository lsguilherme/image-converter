import express from "express";
import multer from "multer";
import zmq from "zeromq";
const router = express.Router();
const upload = multer();
import amqplib from 'amqplib';

router.post("/", upload.single("imagem"), async (req, res) => {

  const queueAPI = 'tasksAPI';
  const queueConverter = 'tasksConverter';
  const conn = await amqplib.connect('amqp://localhost:5672');

  const ch1 = await conn.createChannel();
  const ch2 = await conn.createChannel();
  await ch2.assertQueue(queueAPI);

  // Sender
  if (req.file && req.file.buffer) {
    ch1.sendToQueue(queueConverter, req.file.buffer);
    let nomeOriginal = req.file.originalname
    nomeOriginal = nomeOriginal.split('.')
    nomeOriginal.pop()

    // Listener
    await ch2.consume(queueAPI, async (msg) => {
      if (msg !== null) {
        res.set({
          "Content-Type": "image/jpeg",
          "Content-Disposition": `attachment; filename=${nomeOriginal.join('.')}`,
        });
        res.end(msg.content);
        ch2.ack(msg);
      } else {
        console.log('Consumer cancelado pelo servidor');
      }
    });
  } else {
    res.send('sem arquivo');
  }
});

export default router;
