ALTER TABLE `share_comercial`.`contatos` 
ADD COLUMN `contato_nome` VARCHAR(100) NOT NULL AFTER `contato_tipo`;

ALTER TABLE `share_comercial`.`associacoes` 
CHANGE COLUMN `associacao_cnpj` `associacao_cnpj` VARCHAR(50) NULL DEFAULT NULL ;

ALTER TABLE contatos DROP FOREIGN KEY contato_associacao_id;

ALTER TABLE contatos
ADD CONSTRAINT contato_associacao_id
FOREIGN KEY (contato_associacao_id)
REFERENCES associacoes(associacao_id)
ON DELETE CASCADE;