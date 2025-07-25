ALTER TABLE `share_comercial`.`cidades` 
ADD COLUMN `cidade_favorito` TINYINT NOT NULL DEFAULT 0 AFTER `cidade_uf`;
