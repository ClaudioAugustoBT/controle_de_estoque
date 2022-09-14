<?php

//============================================================+
//API - CRUD de produtos - UPDATE
//============================================================+

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once(dirname(__FILE__) . '/config.php');
require_once(dirname(__FILE__) . '/Database.php');
require_once(dirname(__FILE__) . '/class/Produto.php');

$database = new Database;
$db = $database->connect();

$produto = new Produto($db);

/*
** Adiciona alterar Produto
** ============================================================+
** Method:POST 
** $_POST['json_produto'] = Dados do produto
** $_POST['tipo'] = "info" ou "estoque" -> info = Dados do produto // estoque = altera estoque do produto
** ============================================================+
*/

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (isset($_POST['json_produto'])) {
        $post_produto = json_decode($_POST["json_produto"]);

        if ($post_produto->tipo == "estoque") {
            // $post_produto->mov == 0 -> Retirada // == 1 -> acrescimo
            if ($post_produto->mov == 0) {
                try {
                    $result = $produto->retiradaProduto($post_produto->id, $post_produto->qt_atual, $post_produto->qt_mov);

                    echo $result;
                } catch (Exception $e) {
                    echo 'Error: ' . $e->getMessage();
                }
            } else {
                try {
                    $result = $produto->acrescimoProduto($post_produto->id, $post_produto->qt_atual, $post_produto->qt_mov);

                    echo $result;
                } catch (Exception $e) {
                    echo 'Error: ' . $e->getMessage();
                }
            }
        }else{
            try {
                $result = $produto->aditarProduto($post_produto);

                echo $result;
            } catch (Exception $e) {
                echo 'Error: ' . $e->getMessage();
            }
        }
    } else {
        die("Faltam parametros!");
    }
} else {
    die("Metodo de requisição inválido!");
}
