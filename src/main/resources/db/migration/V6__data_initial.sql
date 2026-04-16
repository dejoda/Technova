


INSERT INTO categoria (nombre, descripcion) VALUES
                                                ('Laptops', 'Computadoras portátiles'),
                                                ('Celulares', 'Smartphones y accesorios'),
                                                ('Monitores', 'Pantallas y monitores'),
                                                ('Teclados', 'Teclados mecánicos y normales'),
                                                ('Mouse', 'Mouse gamer y oficina'),
                                                ('Audifonos', 'Audífonos y headsets'),
                                                ('Componentes PC', 'Partes de computadora');



INSERT INTO caracteristica (nombre) VALUES
                                        ('RAM'),
                                        ('Almacenamiento'),
                                        ('Procesador'),
                                        ('Tarjeta Grafica'),
                                        ('Tamaño Pantalla'),
                                        ('Resolucion'),
                                        ('Frecuencia Hz'),
                                        ('DPI'),
                                        ('Tipo de Conexion'),
                                        ('Tipo de Teclado');



INSERT INTO producto (nombre, descripcion, precio, stock, marca, modelo, garantia, categoria_id) VALUES
                                                                                                     ('Laptop ASUS TUF F15', 'Laptop gamer ASUS', 3500.00, 10, 'ASUS', 'TUF F15', 12, 1),
                                                                                                     ('Laptop Lenovo IdeaPad 3', 'Laptop para oficina y estudio', 2200.00, 15, 'Lenovo', 'IdeaPad 3', 12, 1),
                                                                                                     ('Mouse Logitech G502', 'Mouse gamer RGB', 180.00, 30, 'Logitech', 'G502', 6, 5),
                                                                                                     ('Teclado Redragon Kumara', 'Teclado mecánico RGB', 250.00, 20, 'Redragon', 'Kumara K552', 6, 4),
                                                                                                     ('Monitor LG 24"', 'Monitor Full HD', 600.00, 12, 'LG', '24MK600', 12, 3),
                                                                                                     ('Celular Samsung S21', 'Smartphone gama alta', 2800.00, 8, 'Samsung', 'S21', 12, 2),
                                                                                                     ('Laptop HP Victus 15', 'Laptop gamer HP de alto rendimiento', 3900.00, 9, 'HP', 'Victus 15', 12, 1),
                                                                                                     ('Mouse Razer DeathAdder V2', 'Mouse gamer ergonómico RGB', 210.00, 25, 'Razer', 'DeathAdder V2', 6, 5),
                                                                                                     ('Monitor Samsung Odyssey G5', 'Monitor curvo QHD gamer', 1250.00, 7, 'Samsung', 'Odyssey G5', 12, 3),
                                                                                                     ('Teclado Logitech G Pro', 'Teclado mecánico compacto RGB', 420.00, 14, 'Logitech', 'G Pro', 6, 4);



INSERT INTO producto_caracteristica (producto_id, caracteristica_id, valor) VALUES


(1, 1, '16GB'),
(1, 2, '512GB SSD'),
(1, 3, 'Intel i7'),
(1, 4, 'RTX 3050'),
(1, 5, '15.6 pulgadas'),


(2, 1, '8GB'),
(2, 2, '256GB SSD'),
(2, 3, 'Intel i5'),
(2, 5, '15.6 pulgadas'),


(3, 8, '25600 DPI'),
(3, 9, 'USB'),


(4, 9, 'USB'),
(4, 10, 'Mecanico'),


(5, 5, '24 pulgadas'),
(5, 6, '1920x1080'),
(5, 7, '75Hz'),


(6, 1, '8GB'),
(6, 2, '128GB'),
(6, 5, '6.2 pulgadas'),
(6, 6, '2400x1080'),


(7, 1, '16GB'),
(7, 2, '512GB SSD'),
(7, 3, 'Intel i7'),
(7, 4, 'RTX 4050'),
(7, 5, '15.6 pulgadas'),


(8, 8, '20000 DPI'),
(8, 9, 'USB'),


(9, 5, '27 pulgadas'),
(9, 6, '2560x1440'),
(9, 7, '144Hz'),


(10, 9, 'USB'),
(10, 10, 'Mecanico');



INSERT INTO producto_imagen (id_producto, url_imagen, principal) VALUES

                                                                     (1, 'https://mercury.vtexassets.com/arquivos/ids/23061261-800-800?v=639101574852870000&width=800&height=800&aspect=true', true),
                                                                     (1, 'https://mercury.vtexassets.com/arquivos/ids/23061263-800-800?v=639101574853330000&width=800&height=800&aspect=true', false),

                                                                     (2, 'https://media.falabella.com/falabellaPE/144033918_01/w=1200,h=1200,fit=pad', true),
                                                                     (2, 'https://media.falabella.com/falabellaPE/144033918_01/w=1200,h=1200,fit=pad', false),

                                                                     (3, 'https://media.falabella.com/falabellaPE/142865700_01/w=1500,h=1500,fit=cover', true),
                                                                     (3, 'https://media.falabella.com/falabellaPE/142865700_01/w=1500,h=1500,fit=cover', false),

                                                                     (4, 'https://rayotec.pe/wp-content/uploads/2023/10/kumara-black.jpg', true),
                                                                     (4, 'https://www.compugo.pe/wp-content/uploads/2022/01/teclado-redragon-kumara-rainbow-white-1.jpg', false),

                                                                     (5, 'https://www.lg.com/content/dam/channel/wcms/pe/monitors/gaming/24u411a-b/gallery/DZ-01.jpg/jcr:content/renditions/thum-1600x1062.jpeg', true),
                                                                     (5, 'https://www.lg.com/content/dam/channel/wcms/pe/monitors/gaming/24u411a-b/gallery/DZ-01.jpg/jcr:content/renditions/thum-1600x1062.jpeg', false),

                                                                     (6, 'https://www.peru-smart.com/wp-content/uploads/2023/08/CELU428GRAPHITE-256GB.jpg', true),
                                                                     (6, 'https://www.peru-smart.com/wp-content/uploads/2023/08/CELU428GRAPHITE-256GB.jpg', false),

                                                                     (7, 'https://rymportatiles.com.pe/cdn/shop/files/Victus-15-FB3019LA_1.jpg?v=1762628427&width=1214', true),
                                                                     (7, 'https://rymportatiles.com.pe/cdn/shop/files/8741_portada_c928da47-b9f0-4d62-b707-518d85ef9f0e.jpg?v=1757132178&width=1214', false),

                                                                     (8, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhAPnJO55M3x-3hM0DqrU3o4XOJhnYrNWvQ&s', true),
                                                                     (8, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhAPnJO55M3x-3hM0DqrU3o4XOJhnYrNWvQ&s', false),

                                                                     (9, 'https://dasmitec.pe/wp-content/uploads/2024/06/LS27AG550EL.00.png', true),
                                                                     (9, 'https://dasmitec.pe/wp-content/uploads/2024/06/LS27AG550EL.00.png', false),

                                                                     (10, 'https://storage.googleapis.com/imagenesimpactoperu3/products/920-009388/image_1_20251213_173949_1656.webp', true),
                                                                     (10, 'https://storage.googleapis.com/imagenesimpactoperu3/products/920-009388/image_1_20251213_173949_1656.webp', false)
