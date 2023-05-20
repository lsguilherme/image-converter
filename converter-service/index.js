import sharp from "sharp";
import zmq from "zeromq";

const sock = new zmq.Reply
await sock.bind("tcp://127.0.0.1:3001")

function converterJpgParaPng(nomeArquivoEntrada, nomeArquivoSaida) {
  sharp(nomeArquivoEntrada)
    .png()
    .toFile(nomeArquivoSaida)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

for await (const [msg] of sock) {
  console.log(msg)
  converterJpgParaPng("assets/rocklee.webp", "rocklee.png");
  await sock.send(msg)
}

