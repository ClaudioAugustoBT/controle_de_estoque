<?php

//============================================================+
//API - CRUD de produtos - READ
//============================================================+

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once(dirname(__FILE__) . '/config.php');
require_once(dirname(__FILE__) . '/Database.php');
require_once(dirname(__FILE__) . '/class/Produto.php');

$database = new Database;
$db = $database->connect();

$produto = new Produto($db);

/*
** Consultar produtos
** ============================================================+
** Method:GET 
** Sem parametros -> -> retorna json com todas produtos cadastras
** $_GET['id'] = 'id' -> retorna produto por 
** $_GET['moves'] = 1 -> Historico de movimentações
** ============================================================+
*/

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    if (isset($_GET['moves'])) {
        try {
            $moves = $produto->moves();
            $p_arr["moves"] = array();

            foreach ($moves as $move) {
                array_push($p_arr["moves"], $move);
            }

            echo json_encode($p_arr);
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage();
        }
    } else {
        try {
            $id = isset($_GET['id']) ? $_GET['id'] : null;
            $produtos = $produto->getProduto($id);
            $p_arr["produtos"] = array();

            foreach ($produtos as $produto) {
                array_push($p_arr["produtos"], $produto);
            }

            echo json_encode($p_arr);
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage();
        }
    }
} else {
    die("Metodo de requisição inválido!");
}
