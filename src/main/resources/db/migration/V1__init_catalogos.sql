CREATE TABLE categoria (
                           id BIGINT AUTO_INCREMENT PRIMARY KEY,
                           nombre VARCHAR(100) NOT NULL,
                           descripcion VARCHAR(255)
);

CREATE TABLE caracteristica (
                                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                nombre VARCHAR(100) NOT NULL
);