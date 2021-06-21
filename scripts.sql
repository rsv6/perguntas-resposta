-- Alterar o protocolo de autenticacao de acesso ao MySQL
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<senha>';

SELECT * from perguntas;

START TRANSACTION
-- UPDATE perguntas 
SET descricao = 'Iniciar estudo em Javascript'
WHERE 
	id = 1 AND titulo = 'Estudar Javascript'

ROLLBACK 

COMMIT



SELECT * FROM perguntas;



