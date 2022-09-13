<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>Estoque</title>

    <link rel="stylesheet" type="text/css" href="./assets/css/all.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.12.1/datatables.min.css" />
    <link rel="stylesheet" type="text/css" href="./assets/css/style.css">
</head>

<body>

    <header class="container">
        <div class="row">
            <div class="col-lg-offset-12 col-lg-12 text-center">
                <div class="">
                    <h2>Estoque</h2>
                </div>
            </div>
        </div>
    </header>

    <section class="container-fluid text-center justify-content-center">
        <div class="row">
            <div class="btn-add p-3 justify-content-center">
                <button id="btn_add_produto" class="btn btn-primary" onClick="modalNovoProduto()"><strong><i class="fa fa-plus fa-lg"></i>&nbsp;&nbsp;Novo Produto</strong></button>
            </div>
            <div class="btn-add p-3 justify-content-center">
                <button id="btn_log" class="btn btn-primary"><i class="fas fa-stream"></i>&nbsp;&nbsp;Histórico Movimentação Geral</button>
            </div>
        </div>
    </section>

    <main>
        <div class="card-body table-responsive">
            <table id="dt_produtos" class="table table-striped table-bordered" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th class="dt-center no-sort text-uppercase">ID</th>
                        <th class="dt-center text-uppercase">Nome</th>
                        <th class="dt-center no-sort text-uppercase">Código</th>
                        <th class="dt-center no-sort text-uppercase">Estoque</th>
                        <th class="dt-center no-sort text-uppercase">Valor</th>
                        <th class="dt-center no-sort text-uppercase">Ver Estoque</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <tr>
                        <td>1</td>
                        <td>TESTETETETETE</td>
                        <td>APZ05111</td>
                        <td>0</td>
                        <td>5,55</td>
                        <td>
                            <button class="btn btn-info" id=""><i class="fa-solid fa-square-up-right"></i></button>
                        </td>
                    </tr> -->
                </tbody>
            </table>
        </div>
    </main>

    <!--/*
    |!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!
    |---------------------------------------------------------------------------
    |MODAL PRODUTO DETALHADO
    |---------------------------------------------------------------------------
    |!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!
    */-->
    <div id="modal_detalhe_produto" class="modal fade bg-secondary">
        <div class="modal-dialog modal-lg">
            <div class="modal-content bg-light">
                <div class="modal-header justify-content-center">
                    <div class="title-header">
                        <h4 id="nome_produto">''NOME DO PRODUTO''</h4>
                    </div>
                    <button type="button" class="close btn_close_modal" id="btn_close_modal_detalhe" data-dismiss="modal"><i class="fas fa-times"></i></button>
                </div>

                <div class="modal-body container">
                    <div id="dados_produto">
                        <div class="form-row justify-content-center">
                            <div class="col-md-3 mb-3">
                                <label for="id_prod">ID</label>
                                <input type="text" class="form-control" id="id_prod" disabled />
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="cod_prod">Código</label>
                                <input type="text" class="form-control" id="cod_prod" disabled />
                            </div>
                        </div>
                        <div class="form-row justify-content-center">
                            <div class="col-md-3 mb-3">
                                <label for="qtd_prod">Estoque (Qtd.)</label>
                                <input type="text" class="form-control" id="qtd_prod" disabled />
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="vl_prod">Valor (R$)</label>
                                <input type="text" class="form-control" id="vl_prod" disabled />
                            </div>
                        </div>
                        <div class="form-row justify-content-center">
                            <div class="col-lg-6 text-center">
                                <label for="ds_prod">Descrição</label>
                                <textarea class="form-control" id="ds_prod" readonly></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-primary text-uppercase p-2"><i class="fa-solid fa-pen-to-square"></i>&nbsp;&nbsp;EDITAR</button>
                    <button type="button" class="btn btn-primary text-uppercase p-2"><i class="fa-solid fa-square-plus"></i>&nbsp;&nbsp;ACRESCENTAR</button>
                    <button type="button" class="btn btn-primary text-uppercase p-2"><i class="fa-solid fa-square-minus"></i>&nbsp;&nbsp;RETIRAR</button>
                </div>
            </div>
        </div>
    </div>

    <!--/*
    |!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!
    |---------------------------------------------------------------------------
    |MODAL NOVO PRODUTO
    |---------------------------------------------------------------------------
    |!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!
    */-->
    <div id="modal_novo_produto" class="modal fade bg-secondary">
        <div class="modal-dialog modal-lg">
            <div class="modal-content bg-light">
                <div class="modal-header justify-content-center">
                    <div class="title-header">
                        <h4 id="" class="text-uppercase">Cadastrar novo Produto</h4>
                    </div>
                    <button type="button" class="close" id="btn_close_modal_edit" data-dismiss="modal"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body container">
                    <form id="form_novo_produto" class="was-validated">
                        <div class="form-row justify-content-center">
                            <div class="col-md-3 mb-3">
                                <label for="nm_novo_prod">Nome</label>
                                <input type="text" class="form-control" name="nm_novo_prod" id="nm_novo_prod" required />
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="cod_novo_prod">Código</label>
                                <input type="text"  pattern="^[a-zA-Z0-9]+$" minlength="6" maxlength="6" class="form-control" name="cod_novo_prod" id="cod_novo_prod" required />
                            </div>
                        </div>
                        <div class="form-row justify-content-center">
                            <div class="col-md-3 mb-3">
                                <label for="qtd_novo_prod">Quantidade Inicial</label>
                                <input type="number" inputmode="numeric" step="1" min="0" class="form-control" name="qtd_novo_prod" id="qtd_novo_prod" required />
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="vl_novo_prod">Valor (R$)</label>
                                <input type="number" inputmode="numeric" step="0.01" min="0" class="form-control" name="vl_novo_prod" id="vl_novo_prod" required />
                            </div>
                        </div>
                        <div class="form-row justify-content-center">
                            <div class="col-lg-6 text-center">
                                <label for="ds_edit_prod">Descrição</label>
                                <textarea class="form-control" name="ds_novo_prod" id="ds_novo_prod"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-primary text-uppercase p-2" id="btn_submit_novo_produto"><i class="fa-solid fa-pen-to-square"></i>&nbsp;&nbsp;cadastrar</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>

    <!--/*
    |!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!
    |---------------------------------------------------------------------------
    |MODAL EDITAR PRODUTO
    |---------------------------------------------------------------------------
    |!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!
    */-->
    <div id="modal_editar_produto" class="modal fade bg-secondary">
        <div class="modal-dialog modal-lg">
            <div class="modal-content bg-light">
                <div class="modal-header justify-content-center">
                    <div class="title-header">
                        <h4 id="" class="text-uppercase">Editar Produto:</h4>
                        <br>
                        <h4 id="nome_prod_editar" class="text-uppercase"></h4>
                    </div>
                    <button type="button" class="close" id="btn_close_modal_edit" data-dismiss="modal"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body container">
                    <form id="form_editar_produto" class="was-validated">
                        <div class="form-row justify-content-center">
                            <div class="col-md-3 mb-3">
                                <label for="nm_editar_prod">Nome</label>
                                <input type="text" class="form-control" name="nm_editar_prod" id="nm_editar_prod" required />
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="cod_editar_prod">Código</label>
                                <input type="text"  pattern="^[a-zA-Z0-9]+$" minlength="6" maxlength="6" class="form-control" name="cod_editar_prod" id="cod_editar_prod" required />
                            </div>
                        </div>
                        <div class="form-row justify-content-center">
                            <div class="col-md-3 mb-3">
                                <label for="qtd_editar_prod">Quantidade Inicial</label>
                                <input type="number" inputmode="numeric" step="1" min="0" class="form-control" name="qtd_editar_prod" id="qtd_editar_prod" required />
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="vl_editar_prod">Valor (R$)</label>
                                <input type="number" inputmode="numeric" step="0.01" min="0" class="form-control" name="vl_editar_prod" id="vl_editar_prod" required />
                            </div>
                        </div>
                        <div class="form-row justify-content-center">
                            <div class="col-lg-6 text-center">
                                <label for="ds_edit_prod">Descrição</label>
                                <textarea class="form-control" name="ds_editar_prod" id="ds_editar_prod"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-primary text-uppercase p-2" id="btn_submit_editar_produto"><i class="fa-solid fa-pen-to-square"></i>&nbsp;&nbsp;cadastrar</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>

    <!--==================================================  
    Scripts
    ==================================================-->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.12.1/datatables.min.js"></script>
    <script type="text/javascript" src="./assets/js/sweetalert2.all.min.js"></script>
    <script type="text/javascript" src="./assets/js/init.js"></script>
    <script type="text/javascript" src="./assets/js/script.js"></script>
</body>

</html>