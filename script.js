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

    //loadElements();

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
    var i = 0;
    for (i == 0; i < itens.length; i ++) {
        if (!itens[i] || !itens[i].nome) {
            continue;
        }
        var li = document.createElement("li");
        var t = document.createTextNode(itens[i].nome);
        li.appendChild(t);

        var span = document.createElement("span");
        var txt = document.createTextNode("\u00D7");
        span.className = "spanClose";        
        span.appendChild(txt);
        span.onclick = function() {
            var div = this.parentElement;
            div.style.diplay = "none";
        }
        li.appendChild(span);    

        if (itens[i].linhas && itens[i].linhas.length > 0) {
            var ul = document.createElement("ul")
            createSubItens(ul, itens[i].linhas);

            li.appendChild(ul);
        }
        
        document.getElementById("fileUL").appendChild(li);
    }
}

function createSubItens(ul, linhas) {    
    var i = 0;
    for (i == 0; i < linhas.length; i++) {
        var li = document.createElement("li");
        var t = document.createTextNode(linhas[i]);
        li.appendChild(t);

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
            loadElements(data.arquivos);
        }
    })
    .catch(error => {
        console.log("Error: ", error);
    })
}