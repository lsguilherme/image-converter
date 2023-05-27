let main = document.querySelector('main');
let listaArquivos = document.querySelector('.lista-arquivos');
let tituloArquivosSelecionados = document.querySelector('#selecionados');

let inputFile = document.querySelector('#imagem');
let inputFileCount = document.querySelector('#count');
inputFile.addEventListener('change', (event) => {
    if (inputFile.files.length > 0) {
        listaArquivos.classList.remove('sumir');
        tituloArquivosSelecionados.classList.remove('sumir');
        listaArquivos.innerHTML = '';
        inputFileCount.classList.remove('sumir');
        inputFileCount.textContent = `${inputFile.files.length} ${inputFile.files.length > 1 ? 'arquivos' : 'arquivo'}`

        for (let arquivo of inputFile.files) {
            let item = `<li class="item-arquivo"><img class="arquivo-img" src="${URL.createObjectURL(arquivo)}"><span>${arquivo.name}</span></li>`;
            listaArquivos.innerHTML += item;
        }
    } else {
        listaArquivos.classList.add('sumir');
        tituloArquivosSelecionados.classList.add('sumir');

        inputFileCount.classList.add('sumir');
    }
});

let form = document.getElementById("form")
form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (inputFile.files.length != 0) {
        const formData = new FormData();
        for (let i = 0; i < inputFile.files.length; i++) {
            formData.append('imagem', inputFile.files[i])
        }

        fetch("http://localhost:3000/imagens", {
            method: "POST",
            body: formData,
        }).then(function (response) {
            return response.blob();
        }).then(function (blob) {
            const imageUrl = URL.createObjectURL(blob);
            let fileName = inputFile.files[0].name.split('.');
            fileName[fileName.length - 1] = 'jpeg';
            let link = `<a href="${imageUrl}" class="download" download="${fileName.join('.')}">Donwload</a>`;
            main.innerHTML += link;
        }).catch(function (error) {
            console.error("Erro: ", error);
        });
    } else {
        alert("Nenhum arquivo selecionado!")
    }
});