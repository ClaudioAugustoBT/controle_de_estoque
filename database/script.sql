SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP  SCHEMA IF EXISTS `db_estoque`;
CREATE SCHEMA IF NOT EXISTS `db_estoque` DEFAULT CHARACTER SET utf8 ;
USE `db_estoque` ;

CREATE TABLE IF NOT EXISTS `db_estoque`.`tb_produto` (
  `cd_produto` INT NOT NULL AUTO_INCREMENT,
  `cd_ref_produto` VARCHAR(6) NOT NULL,
  `nm_produto` VARCHAR(64) NOT NULL,
  `ds_produto` VARCHAR(255) NULL,
  `vl_produto` DECIMAL(9,2) NOT NULL,
  `qt_produto` INT NOT NULL,
  PRIMARY KEY (`cd_produto`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `db_estoque`.`tb_saida` (
  `cd_saida` INT NOT NULL AUTO_INCREMENT,
  `dt_saida` DATETIME NOT NULL,
  `cd_produto` INT NOT NULL,
  `old_qt_produto` INT NOT NULL,
  `qt_saida_produto` INT NOT NULL,
  `ds_observacao` VARCHAR(255) NULL,
  PRIMARY KEY (`cd_saida`),
  INDEX `fk_saida_produto_idx` (`cd_produto`),
  CONSTRAINT `fk_saida_produto`
    FOREIGN KEY (`cd_produto`)
    REFERENCES `db_estoque`.`tb_produto` (`cd_produto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `db_estoque`.`tb_entrada` (
  `cd_entrada` INT NOT NULL AUTO_INCREMENT,
  `dt_entrada` DATETIME NOT NULL,
  `cd_produto` INT NOT NULL,
  `old_qt_produto`INT NOT NULL,
  `qt_entrada_produto` INT NOT NULL,
  `ds_observacao` VARCHAR(255) NULL,
  PRIMARY KEY (`cd_entrada`),
  INDEX `fk_entrada_produto_idx` (`cd_produto`),
  CONSTRAINT `fk_entrada_produto`
    FOREIGN KEY (`cd_produto`)
    REFERENCES `db_estoque`.`tb_produto` (`cd_produto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- VIEW de historico
CREATE VIEW historico AS
    SELECT 
        geral.dt,
        geral.cd_produto,
        geral.nm_produto,
        geral.tipo,
        geral.est_ant,
        geral.qt_r,
        geral.qt_a,
        geral.est_novo
    FROM
        (SELECT 
            dt_saida AS dt,
                `tb_saida`.cd_produto AS cd_produto,
                `tb_produto`.nm_produto AS nm_produto,
                'retirada' AS tipo,
                `tb_saida`.old_qt_produto AS est_ant,
                0 AS qt_a,
                `tb_saida`.qt_saida_produto AS qt_r,
                (`tb_saida`.old_qt_produto - `tb_saida`.qt_saida_produto) AS est_novo
        FROM
            tb_saida
        JOIN tb_produto ON `tb_saida`.cd_produto = `tb_produto`.cd_produto UNION SELECT 
            dt_entrada AS dt,
                `tb_entrada`.cd_produto AS cd_produto,
                `tb_produto`.nm_produto AS nm_produto,
                'acrescimo' AS tipo,
                `tb_entrada`.old_qt_produto AS est_ant,
                `tb_entrada`.qt_entrada_produto AS qt_a,
                0 AS qt_r,
                (`tb_entrada`.old_qt_produto + `tb_entrada`.qt_entrada_produto) AS est_novo
        FROM
            tb_entrada
        JOIN tb_produto ON `tb_entrada`.cd_produto = `tb_produto`.cd_produto) AS geral
    ORDER BY geral.dt;
