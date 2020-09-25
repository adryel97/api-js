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
    // Update a user
        var json = JSON.stringify(objUsuario);

        var xhr = new XMLHttpRequest();
        xhr.open("PUT", url+'/codigo='+codigo, true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = function () {
            var usuario = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                console.table(usuario);
            } else {
                console.error(usuario);
            }
        }
        xhr.send(json);
  }

function deleteUsuario(codigo) {
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", url+'/codigo='+codigo, true);
        xhr.onload = function () {
            var usuario = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                console.table(usuario);
            } else {
                console.error(usuario);
            }
        }
        xhr.send(null);
}