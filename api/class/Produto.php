<?php

//============================================================+
//API - CRUD de produtos - Class-> Produto
//============================================================+

class Produto
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getProduto($id = null)
    {
        if (!$id) {
            $query =  "SELECT * FROM tb_produto";
        } else {
            $query = "SELECT * FROM tb_produto WHERE cd_produto=" . $id;
        }

        $produtos = $this->conn->query($query)->fetch_all(MYSQLI_ASSOC);

        return $produtos;
    }

    public function getEntrada($prod = null)
    {
        if (!$prod) {
            $query =  "SELECT * FROM tb_entrada";
        } else {
            $query = "SELECT * FROM tb_entrada WHERE cd_produto=" . $prod;
        }
        $result = $this->conn->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getSaida($prod = null)
    {
        if (!$prod) {
            $query =  "SELECT * FROM tb_saida";
        } else {
            $query = "SELECT * FROM tb_saida WHERE cd_produto=" . $prod;
        }
        $result = $this->conn->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function novoProduto($produto)
    {
        $query = 'INSERT INTO tb_produto (cd_produto, cd_ref_produto, nm_produto, ds_produto, vl_produto, qt_produto ) 
                    VALUES (null,"' . $produto->cd_ref . '","' . $produto->nome . '","' . $produto->ds . '","' . $produto->vl . '","' . $produto->qt . '")';
        $this->conn->query($query);

        return true;
    }

    public function retiradaProduto($id, $oldVL, $qtd)
    {
        $query = 'INSERT INTO tb_saida (cd_saida, dt_saida, cd_produto, old_qt_produto, qt_saida_produto) VALUES (null,"'. date("Y-m-d H:i:s") .'",' . $id . ',' . $oldVL . ',' . $qtd . ')';
        $this->conn->query($query);

        $newVL = floatval($oldVL) - floatval($qtd);

        $up_query = 'UPDATE tb_produto SET qt_produto= ' . $newVL . ' WHERE cd_produto = ' . $id;
        $this->conn->query($up_query);

        return true;
    }

    public function acrescimoProduto($id, $oldVL, $qtd)
    {
        $query = 'INSERT INTO tb_entrada (cd_entrada, dt_entrada, cd_produto, old_qt_produto, qt_entrada_produto) VALUES (null,"'. date("Y-m-d H:i:s") .'",' . $id . ',' . $oldVL . ',' . $qtd . ')';
        $this->conn->query($query);

        $newVL = floatval($oldVL) + floatval($qtd);

        $up_query = 'UPDATE tb_produto SET qt_produto= ' . $newVL . ' WHERE cd_produto = ' . $id;
        $this->conn->query($up_query);

        return true;
    }

    public function aditarProduto($produto)
    {
        $query = 'UPDATE tb_produto 
                    SET cd_ref_produto = ' . $produto->cd_ref . ', nm_produto= ' . $produto->nome . ', ds_produto= ' . $produto->ds .
            ', vl_produto= ' . $produto->vl_update . ' WHERE cd_produto = ' . $produto->id . ';';
        $this->conn->query($query);


        return true;
    }

    public function resetDB()
    {
        $status = 0;
        mysqli_query($this->conn, 'TRUNCATE TABLE tb_entrada') ? $status = 1 : $status = mysqli_error($this->conn);
        mysqli_query($this->conn, 'TRUNCATE TABLE tb_saida') ? $status = 1 : $status = mysqli_error($this->conn);
        mysqli_query($this->conn, 'TRUNCATE TABLE tb_produto') ? $status = 1 : $status = mysqli_error($this->conn);

        return $status;
    }
}
