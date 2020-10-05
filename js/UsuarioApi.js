var url = "http://localhost:8000";

function getUsuarios() {
    
    var data = new FormData();
    var xhr = new XMLHttpRequest();
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var usuarios = JSON.parse(this.responseText);
            //Faça algo
            exibirUsuarios(usuarios);
        }
    });
    
    xhr.open("GET", url);
    xhr.send(data);
    
}
function adicionarUsuarios(objUsuario) {
    
    var xhr = new XMLHttpRequest();
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var usuario = JSON.parse(this.responseText);
            //Faça algo
            alert("usuario adicionado")
        }
    });
    
    xhr.open("POST", url);
    xhr.send(JSON.stringify(objUsuario));
}

function editarUsuario(codigo, objUsuario) {
    var xhr = new XMLHttpRequest();
    let json = JSON.stringify(objUsuario);
    

    xhr.open("PUT", url+'/?codigo='+ codigo, true);
    
    xhr.setRequestHeader('content-type','application/json;charset=utf-8');
    xhr.onload = function (){

        if (this.readyState === 4 ) {
          
        } 
    }
    xhr.send(json);
}

function deleteUsuario(codigo) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url+'/?codigo='+codigo, true);
    xhr.onload = function () {
        if (this.readyState == 4) {
            console.log('Usuario excluido') 
        } 
    };
    xhr.send(null);
}