import express from "express";
import multer from "multer";
import zmq from "zeromq";
const router = express.Router();
const upload = multer();

router.post("/", upload.single("imagem"), async (req, res) => {
  const sock = new zmq.Request();

  sock.connect("tcp://127.0.0.1:3001");

  await sock.send(req.file.buffer);
  const [result] = await sock.receive();

  res.set({
    "Content-Type": "image/jpeg",
    "Content-Disposition": `attachment; filename=${req.file.originalname}`,
  });
  res.end(result);
});

export default router;
