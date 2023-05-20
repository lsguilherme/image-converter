import sharp from "sharp";
import zmq from "zeromq";

const sock = new zmq.Reply();
await sock.bind("tcp://127.0.0.1:3001");

for await (const [msg] of sock) {
  sharp(msg)
    .jpeg()
    .toBuffer()
    .then((data) => {
      sock.send(data);
    })
    .catch((err) => {
      sock.send(err);
    });
}
