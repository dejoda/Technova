CREATE TABLE producto_caracteristica (
                                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                         producto_id BIGINT,
                                         caracteristica_id BIGINT,
                                         valor VARCHAR(255),

                                         FOREIGN KEY (producto_id)
                                             REFERENCES producto(id)
                                             ON DELETE CASCADE,

                                         FOREIGN KEY (caracteristica_id)
                                             REFERENCES caracteristica(id)
);

CREATE TABLE producto_imagen (
                                 id_imagen BIGINT AUTO_INCREMENT PRIMARY KEY,
                                 id_producto BIGINT,
                                 url_imagen VARCHAR(500),
                                 principal BOOLEAN,

                                 FOREIGN KEY (id_producto)
                                     REFERENCES producto(id)
                                     ON DELETE CASCADE
);