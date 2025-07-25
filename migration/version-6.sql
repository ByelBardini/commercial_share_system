ALTER TABLE `share_comercial`.`associacoes` 
ADD COLUMN `associacao_preco_instalacao` DOUBLE NULL DEFAULT NULL AFTER `associacao_data_fechamento`,
ADD COLUMN `associacao_preco_placa` DOUBLE NULL DEFAULT NULL AFTER `associacao_preco_instalacao`;
