CREATE TABLE rol (
                     id INT AUTO_INCREMENT PRIMARY KEY,
                     nombre VARCHAR(50) NOT NULL
);

CREATE TABLE usuario (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         username VARCHAR(100) NOT NULL,
                         password VARCHAR(255) NOT NULL,
                         rol_id INT,
                         FOREIGN KEY (rol_id) REFERENCES rol(id)
);

CREATE TABLE vendedor (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          nombre VARCHAR(100),
                          apellido VARCHAR(100),
                          correo VARCHAR(150) UNIQUE,
                          telefono VARCHAR(20),
                          usuario_id INT UNIQUE,
                          FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);