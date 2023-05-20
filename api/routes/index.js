import express from 'express';

const router = express.Router();

import imagens from "./imagens.js";

router.use('/imagens', imagens);

export default router;