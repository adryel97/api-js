function exibirUsuarios(usuarios) {
    popularTabela(usuarios);
}

function popularTabela(usuarios) {
    for (var i = 0; i < usuarios.length; i++) {
        inserirLinhaTabela(usuarios[i]);
    }

    var btnExcluir = document.querySelectorAll(".excluir");
    var btnEditar = document.querySelectorAll(".editar");

    //pega o atributo do botão envia para a funcao de excluir como parametro
    for (i in btnExcluir) {
        btnExcluir[i].onclick = function () {  
            var idExcluir = this.getAttribute('excluir-id');
            excluirUsuario(idExcluir);
        }
    }

    //pega o atributo do botão envia para a funcao de editar como parametro
    for (i in btnEditar) {
        btnEditar[i].onclick = function () { 
            var idEditar = this.getAttribute('editar-id');
            $('#modalEditar').modal();
            var usuario = usuarios.find(item => item.codigo == idEditar);
            //montagem do modal
            var titulo = document.getElementById('titulo');

            titulo.innerHTML = "Editar -" + usuario.nome;

            var nomeEditar = document.getElementById('nomeEditar');
            var emailEditar = document.getElementById('emailEditar');
            var loginEditar = document.getElementById('loginEditar');
            var senhaEditar = document.getElementById('senhaEditar');

            nomeEditar.value = usuario.nome;
            emailEditar.value = usuario.email;
            loginEditar.value = usuario.login;
            senhaEditar.value = usuario.senha;


            
            var form = document.getElementById('formEditar');
           
            form.onsubmit = function (e) {
                e.preventDefault();
                var objUsuario = {
                    "nome":  nomeEditar.value,
                    "email": emailEditar.value,
                    "login": loginEditar.value,
                    "senha": senhaEditar.value
                }
                editUser(idEditar, objUsuario);
            }
         }
    }
}


function editUser(codigo, objUsuario) {
    editarUsuario(codigo, objUsuario);
}

function excluirUsuario(idExcluir) { 
        var codigo = idExcluir;
        deleteUsuario(codigo);
 }

function inserirLinhaTabela(usuario) {
    var idEditar = usuario.codigo;
    var tabela = document.getElementById('tabelaDeUsuarios');
    var numLinhas = tabela.rows.length;
    var novaLinha = tabela.insertRow(numLinhas);

    var celCodigo = novaLinha.insertCell(0);
    celCodigo.innerHTML = usuario.codigo;

    var celNome = novaLinha.insertCell(1);
    celNome.innerHTML = usuario.nome;

    var celEmail = novaLinha.insertCell(2);
    celEmail.innerHTML = usuario.email;

    var celLogin = novaLinha.insertCell(3);
    celLogin.innerHTML = usuario.login;

    var celAcao = novaLinha.insertCell(4);
    var buttonEditar = document.createElement("BUTTON");
    buttonEditar.setAttribute('editar-id', idEditar);
    buttonEditar.classList.add("editar");
    buttonEditar.classList.add("btn");
    buttonEditar.classList.add("btn-warning");
    buttonEditar.classList.add("btn-sm");
    buttonEditar.innerHTML = "Editar";

    var buttonExcluir = document.createElement("BUTTON");
    buttonExcluir.setAttribute('excluir-id', idEditar);
    buttonExcluir.classList.add("excluir");
    buttonExcluir.classList.add("btn");
    buttonExcluir.classList.add("btn-danger");
    buttonExcluir.classList.add("btn-sm");
    buttonExcluir.classList.add("ml-1");
    buttonExcluir.innerHTML = "Excluir";

    celAcao.append(buttonEditar);
    celAcao.append(buttonExcluir);
}

function validarUsuario(acao) {
    var nome = document.getElementById('nome');
    var email = document.getElementById('email');
    var login = document.getElementById('login');
    var senhaValidar = document.getElementById('senhaValidar');
    if(acao == "add"){
        var dadosValidos = true;
        
        if(nome.value == ""){
            dadosValidos = false;
            nome.classList.add('border');
            nome.classList.add('border-danger');

            var small = document.getElementById('small-nome');
            small.textContent = "Preencha seu nome";
            nome.after(small);

        } else if (email.value == ""){
            dadosValidos = false;
            email.classList.add('border');
            email.classList.add('border-danger');
            
            var small = document.getElementById('small-email');
            small.textContent = "Preencha seu e-mail";
            email.after(small);
        } else if (login.value == "") {
            dadosValidos = false;
            login.classList.add('border');
            login.classList.add('border-danger');
            
            var small = document.getElementById('small-login');
            small.textContent = "Preencha o seu login";
            login.after(small);

        } else {
            if(senha.value != "") {
                if(senha.value == senhaValidar.value){
                    var senhaText = senha.value
                    var intSenha = parseInt(senhaText, 6)
                    if(intSenha.length < 6){
                        alert("A senha deve conter pelo menos 6 caracteres");
                    }
                } else {
                    dadosValidos = false;
                    alert("As senhas informadas não são iguais");
                }
            } else {
                dadosValidos = false;
                alert("Informe a senha");
            }
        }

        if(dadosValidos){
            var objUsuario = {
                "nome": nome.value,
                "email": email.value,
                "login": login.value,
                "senha": senha.value
            }

            adicionarUsuarios(objUsuario);
        }
    }
    return false;
}
  

window.onload = function () {
    getUsuarios();  
}