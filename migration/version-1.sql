CREATE TABLE `share_comercial`.`usuarios` (
  `usuario_id` INT NOT NULL AUTO_INCREMENT,
  `usuario_nome` VARCHAR(100) NOT NULL,
  `usuario_login` VARCHAR(100) NOT NULL,
  `usuario_senha` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`usuario_id`));

CREATE TABLE `share_comercial`.`cidades` (
  `cidade_id` INT NOT NULL AUTO_INCREMENT,
  `cidade_nome` VARCHAR(255) NOT NULL,
  `cidade_uf` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`cidade_id`));

CREATE TABLE `share_comercial`.`associacoes` (
  `associacao_id` INT NOT NULL AUTO_INCREMENT,
  `associacao_cidade_id` INT NOT NULL,
  `associacao_nome` VARCHAR(255) NOT NULL,
  `associacao_nome_fantasia` VARCHAR(100) NOT NULL,
  `associacao_cnpj` INT NOT NULL,
  PRIMARY KEY (`associacao_id`),
  INDEX `associacao_cidade_id_idx` (`associacao_cidade_id` ASC) VISIBLE,
  CONSTRAINT `associacao_cidade_id`
    FOREIGN KEY (`associacao_cidade_id`)
    REFERENCES `share_comercial`.`cidades` (`cidade_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
