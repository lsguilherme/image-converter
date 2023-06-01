import express from "express";
import multer from "multer";
const router = express.Router();
const upload = multer();
import amqplib from 'amqplib';

router.post("/", upload.single("imagem"), async (req, res) => {
  if (req.file && req.file.buffer) {
    (async () => {
      const queueAPI = 'tasksAPI';
      const queueConverter = 'tasksConverter';
      const conn = await amqplib.connect('amqp://localhost:5672');

      conn.on('error', function (err) { /*console.error('RabbitMQ Connection ' + err)*/ })

      const ch1 = await conn.createChannel();
      const ch2 = await conn.createChannel();
      await ch2.assertQueue(queueAPI);

      ch1.sendToQueue(queueConverter, req.file.buffer);

      await ch1.consume(queueAPI, (msg) => {
        if (msg !== null) {
          let nomeOriginal = req.file.originalname.split('.')
          nomeOriginal.pop()
          res.set({
            "Content-Type": "image/jpeg",
            "Content-Disposition": `attachment; filename=${nomeOriginal.join('.')}.jpeg`,
          });
          res.end(msg.content)
          ch1.ack(msg);
        } else {
          console.log('Consumer cancelled by server');
        }
      })
    })();
  } else {
    return res.send('sem arquivo');
  }
});

export default router;
