CREATE TABLE pedido (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        cliente_id INT,
                        fecha DATETIME,
                        total DECIMAL(10,2),
                        estado VARCHAR(50),
                        FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

CREATE TABLE detalle_pedido (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                pedido_id INT,
                                producto_id BIGINT,
                                cantidad INT,
                                precio DECIMAL(10,2),
                                FOREIGN KEY (pedido_id) REFERENCES pedido(id),
                                FOREIGN KEY (producto_id) REFERENCES producto(id)
);

CREATE TABLE pago (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      pedido_id INT,
                      monto DECIMAL(10,2),
                      metodo VARCHAR(50),
                      fecha DATETIME,
                      FOREIGN KEY (pedido_id) REFERENCES pedido(id)
);