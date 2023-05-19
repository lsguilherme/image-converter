import sharp from "sharp";

function converterJpgParaPng(nomeArquivoEntrada, nomeArquivoSaida) {
  sharp(nomeArquivoEntrada)
    .png()
    .toFile(nomeArquivoSaida)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

converterJpgParaPng("assets/rocklee.webp", "rocklee.png");
