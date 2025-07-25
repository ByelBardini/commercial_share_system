ALTER TABLE `share_comercial`.`associacoes` 
ADD UNIQUE INDEX `associacao_nome_UNIQUE` (`associacao_nome` ASC) VISIBLE,
ADD UNIQUE INDEX `associacao_cnpj_UNIQUE` (`associacao_cnpj` ASC) VISIBLE;
;
