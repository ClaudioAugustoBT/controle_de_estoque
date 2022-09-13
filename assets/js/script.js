var json_produtos = JSON.parse('{"produtos": []}');
var produtoSelecionado = 0;

function listaProdutos(){
    $.ajax({
        type: "GET",
        //async: false, Essa opção foi descontinuada por falha na exp do usuario
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

function verProduto(id) {

    produtoSelecionado = id;

    var produtoFiltrado = json_produtos["produtos"].filter(prod => prod.cd_produto == id);

    $("#id_prod").val(produtoFiltrado[0].cd_produto);
    $("#cod_prod").val(produtoFiltrado[0].cd_ref_produto);
    $("#qtd_prod").val(produtoFiltrado[0].qt_produto);
    $("#vl_prod").val(produtoFiltrado[0].vl_produto);
    $("#ds_prod").html(produtoFiltrado[0].ds_produto);
    $("#nome_produto").html(produtoFiltrado[0].nm_produto);

    $("#modal_detalhe_produto").modal();

}

function modalNovoProduto() {
    $(".form-control").val("");
    $("#modal_novo_produto").modal();
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