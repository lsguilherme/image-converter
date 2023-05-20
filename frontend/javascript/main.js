let listaArquivos = document.querySelector('.lista-arquivos');
let tituloArquivosSelecionados = document.querySelector('#selecionados')

let inputFile = document.querySelector('#imagem');
let inputFileCount = document.querySelector('#count');
inputFile.addEventListener('change', (event) => {
    if (inputFile.files.length > 0 && inputFile.files.length <= 10) {
        listaArquivos.classList.remove('sumir');
        tituloArquivosSelecionados.classList.remove('sumir');
        listaArquivos.innerHTML = '';
        inputFileCount.classList.remove('sumir');
        inputFileCount.textContent = `${inputFile.files.length} ${inputFile.files.length > 1 ? 'arquivos' : 'arquivo'}`

        for (let arquivo of inputFile.files) {
            let item = `<li class="item-arquivo"><img src="${URL.createObjectURL(arquivo)}"><span>${arquivo.name}</span></li>`;
            listaArquivos.innerHTML += item;
        }
    } else if (inputFile.files.length > 10) {
        alert("Você só pode enviar no máximo 10 arquivos.")
    } else {
        listaArquivos.classList.add('sumir');
        tituloArquivosSelecionados.classList.add('sumir');

        inputFileCount.classList.add('sumir');
    }
});

let botaoEnviar = document.querySelector('button');
botaoEnviar.addEventListener('click', (event) => {
    listaArquivos.classList.toggle('sumir');
    console.log(listaArquivos.classList);
})

// document
//     .getElementById("form")
//     .addEventListener("submit", function (event) {
//         event.preventDefault();

//         const fileInput = document.getElementById("imagem");

//         const formData = new FormData();
//         formData.append("imagem", fileInput.files[0]);

//         fetch("http://localhost:3000/imagens", {
//             method: "POST",
//             body: formData,
//         })
//             .then(function (response) {
//                 return response.blob();
//             })
//             .then(function (blob) {
//                 const imageUrl = URL.createObjectURL(blob);

//                 const downloadLink = document.createElement("a");
//                 downloadLink.href = imageUrl;
//                 downloadLink.download = "imagem.jpeg";
//                 downloadLink.textContent = "Download";

//                 const imageContainer = document.getElementById("imageContainer");
//                 imageContainer.appendChild(downloadLink);
//             })
//             .catch(function (error) {
//                 console.error("Erro: ", error);
//             });
//     });