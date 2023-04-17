
--@block
CREATE TABLE Users(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    email    VARCHAR(255) NOT NULL UNIQUE,
    pass     VARCHAR(255) NOT NULL,
    pais     VARCHAR(255) NOT NULL,
    estado   VARCHAR(255),
    cidade   VARCHAR(255),
    genero   CHAR(1),
    esportes JSON,
    bio      TEXT 
);


--@block
--RESET

DROP TABLE Users;