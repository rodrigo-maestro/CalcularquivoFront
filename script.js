const fileInput = document.getElementById('my_file');
const url = 'http://127.0.0.1:5000';

function getFile(){
    fileInput.click();
}

obterDadosArquivos();

fileInput.addEventListener('change', (e) => {
    console.log("ola evento")

    const file = e.target.files[0];
    
    if (!file || file == null) {
        return;
    }

    if (file.size/1000/1000 > 2) {
        alert("only files smaller than 2MB")
    }
    
    sendFile(file);

    fileInput.value = null;
});

function sendFile(file){
    console.log("ola");
    if (!file || file == null) {
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch(url+'/arquivos', {
        method: 'POST',
        headers: {
            
        },
        body: formData 
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        else {
            console.log("File upload failed");
        }
    })
    .then(data => {
        console.log("Server response: ", data);
    })
    .catch(error => {
        console.log("Error: ", error);
    })

}

function loadElements(itens) {
    loadFilesList(itens);
}

function loadFilesList(itens) {
    for (let i = 0; i < itens.length; i ++) {
        if (!itens[i] || !itens[i].nome) {
            continue;
        }
        const li = document.createElement("li");
        const t = document.createTextNode(itens[i].nome);

        const div = document.createElement("div");
        div.className = "divArquivo"

        div.appendChild(t);

        const span = document.createElement("span");
        span.className = "spanClose";

        const txt = document.createTextNode("\u00D7");
        
        span.appendChild(txt);
        
        li.dataset.object = JSON.stringify(itens[i]);

        span.onclick = function() {
            if (li.dataset.object) {
                deletarArquivo(JSON.parse(li.dataset.object).nome);

                li.remove();
            }
        }

        div.appendChild(span);
        
        li.appendChild(div);

        if (itens[i].linhas && itens[i].linhas.length > 0) {
            const ul = document.createElement("ul")
            ul.className = "child-list"
            createSubItens(ul, itens[i].linhas);

            li.appendChild(ul);
        }
        
        document.getElementById("fileUL").appendChild(li);
    }
}

function createSubItens(ul, linhas) {    
    for (let i = 0; i < linhas.length; i++) {
        const li = document.createElement("li");

        const div = document.createElement("div");
        const t = document.createTextNode(linhas[i]);
        div.appendChild(t);

        li.appendChild(div);

        ul.appendChild(li);
    }
}

function obterDadosArquivos() {
    fetch(url+'/obterDadosArquivos', {
        method: 'GET',
        headers: {

        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        else {
            console.log("Error");
        }
    })
    .then (data => {
        console.log("Server response: ", data);
        if (data.arquivos) {
            loadFilesList(data.arquivos);
        }
    })
    .catch(error => {
        console.log("Error: ", error);
    })
}

function deletarArquivo(nomeArquivo) {
    fetch(url+'/deletarArquivo/'+nomeArquivo, {
        method:'DELETE',
        headers: {

        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        else {
            console.log("Error");
        }
    })
    .catch(error => {
        console.log("Error: ", error);
    })
}