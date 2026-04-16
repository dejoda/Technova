CREATE TABLE producto (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          nombre VARCHAR(150) NOT NULL,
                          descripcion TEXT,
                          precio DECIMAL(10,2) NOT NULL,
                          stock INT NOT NULL,
                          marca VARCHAR(100),
                          modelo VARCHAR(100),
                          garantia INT,
                          categoria_id BIGINT,
                          FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);