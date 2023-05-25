
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