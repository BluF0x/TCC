

use tcc;
-- @block
-- Criação das tabelas 

-- "pass" é a senha do usuário. Ela NÃO deve ser armazenada em plaintext
-- "genero" é armazenado como um charactere representando as opções de 
-- genero: M = Masculino; F = Feminino; O = Outro; N = Não quero indentificar
-- "esportes" é um formato JSON, pois o mesmo é o unico jeito de armazenar arrays no mysql
-- "bio" é a descrição de perfil do usuário
CREATE TABLE Users(
    usuario_id      INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name            varchar(255) NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password        VARCHAR(255) NOT NULL,
    pais            VARCHAR(255) NOT NULL,
    estado          VARCHAR(255),
    cidade          VARCHAR(255),
    genero          CHAR(1) NOT NULL,
    esportes        JSON,
    bio             TEXT 
);

-- "img" não armazena a imgem em si, mas sim o caminho para ela no servidor.

CREATE TABLE Tenis(
    tenis_id        INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    img             VARCHAR(255) NOT NULL,
    nome            VARCHAR(255) NOT NULL,
    descr           TEXT NOT NULL,
    medium_price    INT NOT NULL,
    nota            FLOAT ,
    data_registro   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- "is_review" determina se é uma review ou não, quando "true" é uma review
-- e quando "false" é um comentário. Isso significa que os comentários e 
-- reviews estarão agrupados juntos, mas isso ocupa menos espaço que criar
-- uma tabela separada. Se caso for um comentário, ele terá um ID de um 
-- "parente" que é o comentário a quem foi respondido. O DEFAULT é que seja
-- um comentário.
-- @block

CREATE TABLE Post(
    review_id       INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nota            TINYINT UNSIGNED,
    data_post       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    corpo_texto     TEXT,
    is_review       BOOLEAN DEFAULT 1,
    reviewer_id     INT UNSIGNED NOT NULL,
    parent_id       INT UNSIGNED DEFAULT NULL,
    tenis_id        INT UNSIGNED NOT NULL,
    FOREIGN KEY(tenis_id) REFERENCES Tenis(tenis_id),
    FOREIGN KEY(reviewer_id) REFERENCES Users(usuario_id),
    FOREIGN KEY(parent_id) REFERENCES Post(review_id)
);

CREATE TABLE test(
    test_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    arr JSON NOT NULL,
    nullabale BOOLEAN
);


ALTER TABLE Users 
ADD img VARCHAR(255) NOT NULL;

-- "categoria" vai ser parâmetros inventados para cada esporte, por exemplo, 
-- corrida vai ter: amortecimento, provas, treinos diários, ...
--"dropt" referencia o Drop do tênis (em mm)
-- "entressola", chuteira de futebol não tem entressola, por isso não é NOT NULL
-- "trava", chuteira de campo é a única que possui travas, por isso não é NOT NULL
-- "img", o slider é feito para quatro fotos, por isso tem 4 imgs, a menos que faça outra de outro estilo

ALTER TABLE Tenis
ADD esporte VARCHAR(255) NOT NULL,
ADD marca VARCHAR(255) NOT NULL,
ADD categoria VARCHAR(255) NOT NULL,
ADD peso VARCHAR(255) NOT NULL,
ADD dropt VARCHAR(255) NOT NULL,
ADD solado VARCHAR(255) NOT NULL,
ADD cabedal VARCHAR(255) NOT NULL,
ADD palmilha VARCHAR(255) NOT NULL,
ADD entressola VARCHAR(255),
ADD trava VARCHAR(255),
ADD img2 VARCHAR(255) NOT NULL,
ADD img3 VARCHAR(255) NOT NULL,
ADD img4 VARCHAR(255) NOT NULL;

-- Adiciona as colunas likes, e dislikes, e remove is_review, por ser redundante

ALTER TABLE post
ADD likes INT NOT NULL DEFAULT 0, -- Teoricamente, é redundante colocar default de uma int como 0, mas facilita deixar explícito
ADD dislikes INT NOT NULL DEFAULT 0,
DROP COLUMN is_review;


-- "categoria" desconto vai ser o valor de desconto (10%, R$100 OFF) 
-- "cupom" é o link do site
ALTER TABLE Tenis
ADD desconto VARCHAR(255),
ADD cupom VARCHAR(255);

ALTER TABLE Users
ADD admin TINYINT(1) DEFAULT 0;

ALTER TABLE Post ADD deletado TINYINT(1) NOT NULL DEFAULT 0;

ALTER TABLE Tenis ADD picutres JSON;

-- Drop

DROP TABLE Users;
DROP TABLE Post;
DROP TABLE Tenis;

DROP TABLE test;
-- Test insert

SELECT * FROM Users;

ALTER TABLE tenis
DROP COLUMN nota;

ALTER TABLE tenis
ADD COLUMN nota FLOAT AFTER medium_price;

ALTER TABLE tenis
ADD COLUMN nome VARCHAR(255) AFTER  img;