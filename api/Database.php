<?php

class Database
{

    public function connect()
    {
        try {
            $conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
        } catch (Exception $e) {
            die('Error: ' . $e->getMessage());
        }

        return $conn;
    }
}
