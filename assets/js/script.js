var json_produtos = JSON.parse('{"produtos": []}');
var produtoSelecionado = 0;

function listaProdutos() {
    $.ajax({
        type: "GET",
        url: "http://localhost/testedc/api/read",
        dataType: "json",
        success: function (response) {
            if (response["produtos"]) {
                json_produtos = response;
                var data = [];
                response["produtos"].forEach(produto => {
                    let obj = {
                        "id": produto["cd_produto"],
                        "nome": produto["nm_produto"],
                        "cod": produto["cd_ref_produto"],
                        "qt": produto["qt_produto"],
                        "vl": produto["vl_produto"],
                        "btn": '<button class="btn btn-info" onClick="verProduto(' + produto["cd_produto"] + ')" id=""><i class="fa-solid fa-square-up-right"></i></button>'
                    };
                    data.push(obj);
                });

                /* Cria tabela/lista de produtos */
                dt_produtos = $("#dt_produtos").DataTable({
                    "responsive": { details: true },
                    "processing": true,
                    "info": false,
                    "serverSide": false,
                    "searching": false,
                    "autoWidth": true,
                    "order": [[0, "asc"]],
                    "ordering": true,
                    "data": data,
                    columns: [
                        { "data": 'id' },
                        { "data": 'nome' },
                        { "data": 'cod' },
                        { "data": 'qt' },
                        { "data": 'vl' },
                        { "data": 'btn' }
                    ],
                    "columnDefs": [
                        { targets: "no-sort", orderable: false },
                        { targets: "dt-center", className: "dt-center" }
                    ]

                });

            } else {
                alert("Erro so requisitar dados!")
            }
        }
    });

}

function historicoMovimento(){
    $.ajax({
        type: "GET",
        url: "http://localhost/testedc/api/read?moves=1",
        dataType: "json",
        success: function (response) {
            if (response["moves"]) {
                var data = [];
                response["moves"].forEach(move => {
                    let obj = {
                        "dt": move["dt"],
                        "prod": move["nm_produto"],
                        "tipo": move["tipo"],
                        "est_ant": move["est_ant"],
                        "qt": move["tipo"] == "retirada" ? move["qt_r"] : move["qt_a"],
                        "est": move["est_novo"]
                    };
                    data.push(obj);
                });

                /* Cria tabela/lista de moves */
                dt_historico = $("#dt_historico").DataTable({
                    "responsive": { details: true },
                    "processing": false,
                    "info": false,
                    "serverSide": false,
                    "searching": false,
                    "autoWidth": true,
                    "ordering": false,
                    "data": data,
                    columns: [
                        { "data": 'dt' },
                        { "data": 'prod' },
                        { "data": 'tipo' },
                        { "data": 'est_ant' },
                        { "data": 'qt' },
                        { "data": 'est' }
                    ],
                    "columnDefs": [
                        { targets: "no-sort", orderable: false },
                        { targets: "dt-center", className: "dt-center" }
                    ]

                });


                $("#modal_historico").modal();
            } else {
                alert("Erro so requisitar dados!")
            }
        }
    });

}

function modalNovoProduto() {
    $(".form-control").val("");
    $("#modal_novo_produto").modal();
}

function verProduto(id) {

    produtoSelecionado = id;

    var produtoFiltrado = json_produtos["produtos"].filter(prod => prod.cd_produto == id);

    $("#id_prod").val(produtoFiltrado[0].cd_produto);
    $("#cod_prod").val(produtoFiltrado[0].cd_ref_produto);
    $("#qtd_prod").val(produtoFiltrado[0].qt_produto);
    $("#vl_prod").val(produtoFiltrado[0].vl_produto);
    $("#ds_prod").html(produtoFiltrado[0].ds_produto);
    $("#nome_produto").html(produtoFiltrado[0].nm_produto);
    $("#btn-group").html(
        '<button type="button" onClick="editarProduto(' + produtoFiltrado[0].cd_produto + ')"  class="btn btn-primary text-uppercase p-2"><i class="fa-solid fa-pen-to-square"></i>&nbsp;&nbsp;EDITAR</button>' +
        '<button type="button" onClick="acrescimoProduto(' + produtoFiltrado[0].cd_produto + ')" class="btn btn-primary text-uppercase p-2"><i class="fa-solid fa-square-plus"></i>&nbsp;&nbsp;ACRESCENTAR</button>' +
        '<button type="button" onClick="retiradaProduto(' + produtoFiltrado[0].cd_produto + ')"class="btn btn-primary text-uppercase p-2"><i class="fa-solid fa-square-minus"></i>&nbsp;&nbsp;RETIRAR</button>'
    );

    $("#modal_detalhe_produto").modal();

}

function editarProduto(id) {

    produtoSelecionado = id;

    var produtoFiltrado = json_produtos["produtos"].filter(prod => prod.cd_produto == id);

    $("#id_editar_prod").val(produtoFiltrado[0].cd_produto);
    $("#cod_editar_prod").val(produtoFiltrado[0].cd_ref_produto);
    $("#vl_editar_prod").val(produtoFiltrado[0].vl_produto);
    $("#ds_editar_prod").html(produtoFiltrado[0].ds_produto);
    $("#nm_editar_prod").val(produtoFiltrado[0].nm_produto);

    $("#modal_editar_produto").modal();

}

function acrescimoProduto(id) {

    produtoSelecionado = id;

    var produtoFiltrado = json_produtos["produtos"].filter(prod => prod.cd_produto == id);

    $("#id_acrescimo_prod").val(produtoFiltrado[0].cd_produto);
    $("#cod_acrescimo_prod").val(produtoFiltrado[0].cd_ref_produto);
    $("#qtd_atual_acrescimo_prod").val(produtoFiltrado[0].qt_produto);
    $("#nm_acrescimo_prod").val(produtoFiltrado[0].nm_produto);

    $("#modal_acrescimo_produto").modal();

}

function retiradaProduto(id) {

    produtoSelecionado = id;

    var produtoFiltrado = json_produtos["produtos"].filter(prod => prod.cd_produto == id);

    $("#id_retirada_prod").val(produtoFiltrado[0].cd_produto);
    $("#cod_retirada_prod").val(produtoFiltrado[0].cd_ref_produto);
    $("#qtd_atual_retirada_prod").val(produtoFiltrado[0].qt_produto);
    $("#nm_retirada_prod").val(produtoFiltrado[0].nm_produto);

    $("#modal_retirada_produto").modal();

}

/*
|!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!
|---------------------------------------------------------------------------
|SUBMITS
|---------------------------------------------------------------------------
|!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!
*/

/*
/////////////////////////////////////////
/Novo Produto
/////////////////////////////////////////
*/
$("#btn_submit_novo_produto").click(function () {
    let cod = $("#cod_novo_prod").val().toLowerCase();
    let nome = $("#nm_novo_prod").val().toLowerCase();
    let verificaCod = json_produtos["produtos"].filter(prod => prod.cd_ref_produto.toLowerCase() == cod);
    let verificaNome = json_produtos["produtos"].filter(prod => prod.nm_produto.toLowerCase() == nome);
    if (verificaCod.length != 0) {
        Swal.fire({
            icon: 'error',
            title: 'Código já utilizada em outro material!',
            text: 'Digite outro'
        });
        $("#cod_novo_prod").val("");
    } else if (verificaNome.length != 0) {
        Swal.fire({
            icon: 'error',
            title: 'Nome já utilizado em outro produto!',
            text: 'Digite outro'
        });
        $("#nm_novo_prod").val("");
    } else {
        var inputs, i, valid = true;
        inputs = $("#form_novo_produto").find("input");

        // Verifica se os inputs tem conteudo
        for (i = 0; i < inputs.length; i++) {
            // If a field is empty...
            if (inputs[i].value == "") {
                // add an "invalid" class to the field:
                inputs[i].className += " invalid";
                // and set the current valid status to false:
                valid = false;
            }
        }

        if (valid) {
            var json_produto = { "nome": $("#nm_novo_prod").val(), "cd_ref": $("#cod_novo_prod").val(), "ds": $.trim($("#ds_novo_prod").val()), "vl": $("#vl_novo_prod").val(), "qt": $("#qtd_novo_prod").val() }
            console.log(json_produto);
            $.ajax({
                type: "POST",
                url: "http://localhost/testedc/api/create",
                dataType: "json",
                data: "json_produto=" + JSON.stringify(json_produto),
                success: function (response) {
                    console.log(response);
                    if (response == 1) {
                        Swal.fire({
                            title: "Sucesso!",
                            icon: "success",
                            button: "Ok",
                        });

                        $("#modal_novo_produto").modal("hide");
                        $("#form_novo_produto")[0].reset();
                        document.location.reload();
                    } else {
                        Swal.fire({
                            title: "Ocorreram os seguintes problemas:",
                            text: response["error_list"],
                            icon: "error",
                            button: "Tentar novamente",
                        });
                    }
                },
                error: function (err) {
                    console.log(err);
                },
                statusCode: {
                    404: function () {
                        alert("Pagina não encontrada!");
                        document.location.reload();
                    },
                    500: function () {
                        alert("Falha ao conectar ao servidor!");
                        document.location.reload();
                    }
                }
            });
        } else {
            Swal.fire({
                title: "Ops!",
                text: "Preencha todos os campos obrigatórios do formulário corretamente!",
                icon: "error",
                button: "Ok",
            });
        }
    }


});

/*
/////////////////////////////////////////
/Editar Produto
/////////////////////////////////////////
*/
$("#btn_submit_editar_produto").click(function () {
    let cod = $("#cod_editar_prod").val().toLowerCase();
    let nome = $("#nm_editar_prod").val().toLowerCase();
    let id = $("#id_editar_prod").val();
    let verificaCod = json_produtos["produtos"].filter(prod => prod.cd_ref_produto.toLowerCase() == cod && prod.cd_produto != id);
    let verificaNome = json_produtos["produtos"].filter(prod => prod.nm_produto.toLowerCase() == nome && prod.cd_produto != id);
    if (verificaCod.length != 0) {
        Swal.fire({
            icon: 'error',
            title: 'Código já utilizada em outro material!',
            text: 'Digite outro'
        });
        $("#cod_editar_prod").val("");
    } else if (verificaNome.length != 0) {
        Swal.fire({
            icon: 'error',
            title: 'Nome já utilizado em outro produto!',
            text: 'Digite outro'
        });
        $("#nm_editar_prod").val("");
    } else {
        var inputs, i, valid = true;
        inputs = $("#form_editar_produto").find("input");

        // Verifica se os inputs tem conteudo
        for (i = 0; i < inputs.length; i++) {
            // If a field is empty...
            if (inputs[i].value == "") {
                // add an "invalid" class to the field:
                inputs[i].className += " invalid";
                // and set the current valid status to false:
                valid = false;
            }
        }

        if (valid) {
            var json_produto = {
                "tipo": "info",
                "id": id,
                "nome": $("#nm_editar_prod").val(),
                "cd_ref": $("#cod_editar_prod").val(),
                "ds": $.trim($("#ds_editar_prod").val()),
                "vl_update": $("#vl_editar_prod").val()
            }
            // console.log(json_produto);
            $.ajax({
                type: "POST",
                url: "http://localhost/testedc/api/update",
                dataType: "json",
                data: "json_produto=" + JSON.stringify(json_produto),
                success: function (response) {
                    console.log(response);
                    if (response == 1) {
                        Swal.fire({
                            title: "Sucesso!",
                            icon: "success",
                            button: "Ok",
                        });

                        $("#modal_editar_produto").modal("hide");
                        $("#form_editar_produto")[0].reset();
                        document.location.reload();
                    } else {
                        Swal.fire({
                            title: "Ocorreram os seguintes problemas:",
                            text: response["error_list"],
                            icon: "error",
                            button: "Tentar novamente",
                        });
                    }
                },
                error: function (err) {
                    console.log(err);
                },
                statusCode: {
                    404: function () {
                        alert("Pagina não encontrada!");
                        document.location.reload();
                    },
                    500: function () {
                        alert("Falha ao conectar ao servidor!");
                        document.location.reload();
                    }
                }
            });
        } else {
            Swal.fire({
                title: "Ops!",
                text: "Preencha todos os campos obrigatórios do formulário corretamente!",
                icon: "error",
                button: "Ok",
            });
        }
    }


});

/*
/////////////////////////////////////////
/Acrescimo de Estoque do Produto
/////////////////////////////////////////
*/
$("#btn_submit_acrescimo_produto").click(function () {

    let id = $("#id_acrescimo_prod").val();
    let prod_filter = json_produtos["produtos"].filter(prod => prod.cd_produto == id);

    if (parseInt($("#qtd_acrescimo_prod").val()) <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Quantidade invalida!',
            text: 'Digite novamente!'
        });
        $("#qtd_acrescimo_prod").val("");
    } else {
        var inputs, i, valid = true;
        inputs = $("#form_acrescimo_produto").find("input");

        // Verifica se os inputs tem conteudo
        for (i = 0; i < inputs.length; i++) {
            // If a field is empty...
            if (inputs[i].value == "") {
                // add an "invalid" class to the field:
                inputs[i].className += " invalid";
                // and set the current valid status to false:
                valid = false;
            }
        }

        if (valid) {
            var json_produto = {
                "tipo": "estoque",
                "mov": 1,
                "id": id,
                "qt_atual": prod_filter[0].qt_produto,
                "qt_mov": $("#qtd_acrescimo_prod").val()
            }
            // console.log(json_produto);
            $.ajax({
                type: "POST",
                url: "http://localhost/testedc/api/update",
                dataType: "json",
                data: "json_produto=" + JSON.stringify(json_produto),
                success: function (response) {
                    console.log(response);
                    if (response == 1) {
                        Swal.fire({
                            title: "Sucesso!",
                            icon: "success",
                            button: "Ok",
                        });

                        $("#modal_acrescimo_produto").modal("hide");
                        $("#form_acrescimo_produto")[0].reset();
                        document.location.reload();
                    } else {
                        Swal.fire({
                            title: "Ocorreram os seguintes problemas:",
                            text: response["error_list"],
                            icon: "error",
                            button: "Tentar novamente",
                        });
                    }
                },
                error: function (err) {
                    console.log(err);
                },
                statusCode: {
                    404: function () {
                        alert("Pagina não encontrada!");
                        document.location.reload();
                    },
                    500: function () {
                        alert("Falha ao conectar ao servidor!");
                        document.location.reload();
                    }
                }
            });
        } else {
            Swal.fire({
                title: "Ops!",
                text: "Preencha todos os campos obrigatórios do formulário corretamente!",
                icon: "error",
                button: "Ok",
            });
        }
    }


});

/*
/////////////////////////////////////////
/Retirada de Estoque do Produto
/////////////////////////////////////////
*/
$("#btn_submit_retirada_produto").click(function () {

    let id = $("#id_retirada_prod").val();
    let prod_filter = json_produtos["produtos"].filter(prod => prod.cd_produto == id);

    if (parseInt($("#qtd_retirada_prod").val()) <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Quantidade invalida!',
            text: 'Digite novamente!'
        });
        $("#qtd_retirada_prod").val("");
    } else if (parseInt($("#qtd_retirada_prod").val()) > parseInt(prod_filter[0].qt_produto)) {
        Swal.fire({
            icon: 'error',
            title: 'Retirada maior que estoque!',
            text: 'Digite novamente!'
        });
        $("#qtd_retirada_prod").val("");
    } else {
        var inputs, i, valid = true;
        inputs = $("#form_retirada_produto").find("input");

        // Verifica se os inputs tem conteudo
        for (i = 0; i < inputs.length; i++) {
            // If a field is empty...
            if (inputs[i].value == "") {
                // add an "invalid" class to the field:
                inputs[i].className += " invalid";
                // and set the current valid status to false:
                valid = false;
            }
        }

        if (valid) {
            var json_produto = {
                "tipo": "estoque",
                "mov": 0,
                "id": id,
                "qt_atual": prod_filter[0].qt_produto,
                "qt_mov": $("#qtd_retirada_prod").val()
            }
            // console.log(json_produto);
            $.ajax({
                type: "POST",
                url: "http://localhost/testedc/api/update",
                dataType: "json",
                data: "json_produto=" + JSON.stringify(json_produto),
                success: function (response) {
                    console.log(response);
                    if (response == 1) {
                        Swal.fire({
                            title: "Sucesso!",
                            icon: "success",
                            button: "Ok",
                        });

                        $("#modal_retirada_produto").modal("hide");
                        $("#form_retirada_produto")[0].reset();
                        document.location.reload();
                    } else {
                        Swal.fire({
                            title: "Ocorreram os seguintes problemas:",
                            text: response["error_list"],
                            icon: "error",
                            button: "Tentar novamente",
                        });
                    }
                },
                error: function (err) {
                    console.log(err);
                },
                statusCode: {
                    404: function () {
                        alert("Pagina não encontrada!");
                        document.location.reload();
                    },
                    500: function () {
                        alert("Falha ao conectar ao servidor!");
                        document.location.reload();
                    }
                }
            });
        } else {
            Swal.fire({
                title: "Ops!",
                text: "Preencha todos os campos obrigatórios do formulário corretamente!",
                icon: "error",
                button: "Ok",
            });
        }
    }


});

