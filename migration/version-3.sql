ALTER TABLE `share_comercial`.`associacoes` 
ADD COLUMN `associacao_data_contato` DATE NULL AFTER `associacao_cnpj`,
ADD COLUMN `associcacao_data_fechamento` DATE NULL AFTER `associacao_data_contato`,
ADD COLUMN `associacao_observacao` TEXT NULL AFTER `associcacao_data_fechamento`,
ADD COLUMN `associacao_cliente` TINYINT NOT NULL AFTER `associacao_observacao`;

CHANGE COLUMN `associacao_nome_fantasia` `associacao_nome_fantasia` VARCHAR(100) NULL ;

CREATE TABLE `share_comercial`.`contatos` (
  `contato_id` INT NOT NULL AUTO_INCREMENT,
  `contato_associacao_id` INT NOT NULL,
  `contato_tipo` ENUM('telefone', 'email') NOT NULL,
  `contato` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`contato_id`),
  INDEX `contato_associacao_id_idx` (`contato_associacao_id` ASC) VISIBLE,
  CONSTRAINT `contato_associacao_id`
    FOREIGN KEY (`contato_associacao_id`)
    REFERENCES `share_comercial`.`associacoes` (`associacao_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
