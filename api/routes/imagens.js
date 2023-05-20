import express from 'express'
import multer from 'multer'
import zmq from 'zeromq'
const router = express.Router()
const upload = multer()

router.post('/', upload.single('imagem'), async (req, res) => {
    // console.log(req.file)

    const sock = new zmq.Request

    sock.connect("tcp://127.0.0.1:3001")

    await sock.send(req.file.buffer)
    const [result] = await sock.receive()

    console.log(result)
    
    // res.set({
    //     "Content-Type": req.file.mimetype,
    //     "Content-Disposition": `attachment; filename=${req.file.originalname}`
    // });
    res.end(result);
});


export default router;