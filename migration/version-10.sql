ALTER TABLE `share_comercial`.`usuarios` 
ADD COLUMN `usuario_refresh_token` VARCHAR(200) NULL AFTER `usuario_ativo`;
