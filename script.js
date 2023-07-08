const fileInput = document.getElementById('my_file');
const url = 'http://localhost:3000';

function getFile(){
    fileInput.click();
}

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    
    if (!file || file == null) {
        return;
    }

    if (file.size/1000/1000 > 2) {
        alert("only files smaller than 2MB")
    }
    
    console.log(file);

    sendFile(file);
});

function sendFile(file){
    if (!file || file == null) {
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch(url+'/upload', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
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