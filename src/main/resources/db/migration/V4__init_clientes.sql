CREATE TABLE cliente (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         nombre VARCHAR(100),
                         apellido VARCHAR(100),
                         correo VARCHAR(150) UNIQUE,
                         telefono VARCHAR(20),
                         usuario_id INT UNIQUE,
                         FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE direccion (
                           id INT AUTO_INCREMENT PRIMARY KEY,
                           cliente_id INT,
                           direccion VARCHAR(255),
                           ciudad VARCHAR(100),
                           referencia VARCHAR(255),
                           FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);