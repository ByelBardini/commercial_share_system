ALTER TABLE `share_comercial`.`associacoes` 
ADD COLUMN `associacao_favorito` TINYINT NOT NULL DEFAULT 0 AFTER `associacao_cliente`;
