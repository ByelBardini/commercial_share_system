ALTER TABLE `share_comercial`.`cidades` 
CHANGE COLUMN `cidade_uf` `cidade_uf` VARCHAR(2) NULL ;

ALTER TABLE `share_comercial`.`associacoes` 
ADD COLUMN `associacao_tipo` ENUM('empresa', 'pf', 'associacao') NOT NULL AFTER `associacao_nome_fantasia`;
