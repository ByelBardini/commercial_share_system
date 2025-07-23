ALTER TABLE `share_comercial`.`usuarios` 
ADD COLUMN `usuario_role` ENUM('adm', 'usuario') NOT NULL AFTER `usuario_senha`,
ADD COLUMN `usuario_troca_senha` TINYINT NOT NULL AFTER `usuario_role`;

CREATE TABLE `share_comercial`.`logs` (
  `log_id` INT NOT NULL AUTO_INCREMENT,
  `log_usuario_id` INT NOT NULL,
  `log_campo_alterado` VARCHAR(100) NOT NULL,
  `log_valor_antigo` TEXT NOT NULL,
  `log_valor_novo` TEXT NOT NULL,
  `log_data_alteracao` DATETIME NOT NULL,
  PRIMARY KEY (`log_id`),
  INDEX `log_usuario_id_idx` (`log_usuario_id` ASC) VISIBLE,
  CONSTRAINT `log_usuario_id`
    FOREIGN KEY (`log_usuario_id`)
    REFERENCES `share_comercial`.`usuarios` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);