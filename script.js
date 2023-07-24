const fileInput = document.getElementById('my_file');
const url = 'http://127.0.0.1:5000';

function getFile(){
    fileInput.click();
}

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

    newElement();

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

var close = document.getElementsByClassName("spanClose")
var i = 0;

function newElement() {
    var li = document.createElement("li");
    var t = document.createTextNode("TESTE");
    li.appendChild(t);
    
    document.getElementById("fileUL").appendChild(li);

    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.className = "spanClose";
    span.appendChild(txt);
    li.appendChild(span);

    for (i == 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.diplay = "none";
        }
    }
}