<?php

//============================================================+
//API - CRUD de produtos - CREATE
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
** Adiciona novo Produto
** ============================================================+
** Method:POST 
** $_POST['json_produto']
** ============================================================+
*/

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (isset($_POST['json_produto'])) {
        try {
            $post_produto = json_decode($_POST["json_produto"]);

            if($post_produto->nome)

            $result = $produto->novoProduto($post_produto);

            echo $result;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage();
        }
    } else {
        die("Faltam parametros!");
    }
} else {
    die("Metodo de requisição inválido!");
}
