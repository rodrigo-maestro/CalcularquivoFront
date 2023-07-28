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
        console.log(itens[i])
        var li = document.createElement("li");
        var t = document.createTextNode(itens[i]);
        li.appendChild(t);
        
        document.getElementById("fileUL").appendChild(li);
    
        var span = document.createElement("span");
        var txt = document.createTextNode("\u00D7");
        span.className = "spanClose";        
        span.appendChild(txt);
        span.onclick = function() {
            var div = this.parentElement;
            div.style.diplay = "none";
        }
        li.appendChild(span);    
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