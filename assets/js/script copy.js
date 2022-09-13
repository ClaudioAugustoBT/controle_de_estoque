var json_pessoas = JSON.parse('{"pessoas": []}');

document.addEventListener("DOMContentLoaded", function (e) {
    txt_area(json_pessoas);
    tab_json();
});

function ler() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost/teste_turim/api/");
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            json_pessoas = JSON.parse(this.responseText);
            txt_area(json_pessoas);
            tab_json();
        }
    };
    xhttp.send();
}

function gravar() {
    var json_upload = "json_pessoas=" + JSON.stringify(json_pessoas);
    var xhttp = new XMLHttpRequest(); 
    xhttp.open("POST", "http://localhost/teste_turim/api/gravar.php/");
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if(this.responseText == 1){
                alert("Sucesso ao gravar!");
            }else{
                alert("this.responseText");
            }
        }
    };
    xhttp.send(json_upload);
}

function cadastrar_pessoa() {
    var form = document.getElementById("form_nova_pessoa");
    var nome = form.elements['nome_pessoa'].value;
    if (nome_valido(nome)) {
        var string_pessoa = `{"nome": "${nome}","filhos": []}`;
        json_pessoas.pessoas.push(JSON.parse(string_pessoa));
        txt_area(json_pessoas);
        tab_json();
        form.reset();
    } else {
        alert("Nome inválido!\n\n O nome NÃO pode:\n- Iniciar/terminar com espaço\n -Conter numeros ou caracteres especiais ")
        form.reset();
    }

}

function add_filho(idx) {
    let nome_filho = prompt(`Adicionar filho: ${json_pessoas.pessoas[idx].nome}`);
    if (!nome_filho || nome_filho == null || nome_filho == "") {
        return false;
    } else {
        if (nome_valido(nome_filho)) {
            json_pessoas.pessoas[idx].filhos.push(nome_filho);
            txt_area(json_pessoas);
            tab_json();
        } else {
            alert("Nome inválido!\n\n O nome NÃO pode:\n- Iniciar/terminar com espaço\n -Conter numeros ou caracteres especiais ")
            add_filho(idx);
        }
    }
}

function remover_pessoa(idx_pessoa) {
    json_pessoas.pessoas.splice(idx_pessoa, 1);
    txt_area(json_pessoas);
    tab_json();
}

function remover_filho(idx_pessoa, idx_filho) {
    json_pessoas.pessoas[idx_pessoa].filhos.splice(idx_filho, 1);
    txt_area(json_pessoas);
    tab_json();
}

function txt_area(obj) {
    var txt_json = JSON.stringify(obj, undefined, 4);
    document.getElementById('json_txt').value = txt_json;
}

function tab_json() {

    var tbody = document.getElementById("tbody_pessoas");
    var row = "";

    if (json_pessoas.pessoas.length <= 0) {
        row += '<tr nobr="true" class="bg_2">';
        row += `<td colspan="4">Sem registros.</td></tr>`;
    }
    for (let idx = 0; idx < json_pessoas.pessoas.length; idx++) {
        row += '<tr nobr="true" class="bg_2">';
        row += `<td style="width:70%" colspan="3">${json_pessoas.pessoas[idx].nome}</td>`;
        row += `<td style="width:30%"><button onclick="remover_pessoa(${idx})">Remover</button></td></tr>`;

        if (json_pessoas.pessoas[idx].filhos) {
            for (filho in json_pessoas.pessoas[idx].filhos) {
                row += `<tr nobr="true" class="bg_3">`;
                row += `<td style="width:70%" colspan="3">${json_pessoas.pessoas[idx].filhos[filho]}</td>`;
                row += `<td style="width:30%"><button  onclick="remover_filho(${idx}, ${filho})">Remover Filho</button></td></tr>`
            }
        }


        row += `</tr><tr nobr="true" align="center" class="bg_4"><td colspan="4" class="bg_4"><button onclick="add_filho(${idx})">Adicionar Filho</button></td></tr>`;
    }
    tbody.innerHTML = row;
}

function nome_valido(nome) {
    var rgx = /^[A-Za-z]+[A-Za-z ]+[A-Za-z]$/;
    return nome.match(rgx);
}