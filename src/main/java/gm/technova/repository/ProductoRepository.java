package gm.technova.repository;

import gm.technova.Entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    @Query("""
    SELECT DISTINCT p FROM Producto p
    LEFT JOIN FETCH p.imagenes
    LEFT JOIN FETCH p.caracteristicas pc
    LEFT JOIN FETCH pc.caracteristica
    LEFT JOIN FETCH p.categoria
    WHERE p.idProducto = :id
    """)
    Producto obtenerProductoDetalle(@Param("id") Long id);


    List<Producto> findByCategoriaIdCategoria(Long idCategoria);

    //Para los filtrados parte del ProductoPresentacionDTO
    @Query("""
    SELECT p FROM Producto p
    WHERE (:categoria IS NULL OR LOWER(p.categoria.nombre) = LOWER(:categoria))
    AND (:marca IS NULL OR LOWER(p.marca) = LOWER(:marca))
    AND (:minPrecio IS NULL OR p.precio >= :minPrecio)
    AND (:maxPrecio IS NULL OR p.precio <= :maxPrecio)
    AND (:nombre IS NULL OR LOWER(p.nombre) LIKE LOWER(CONCAT('%', :nombre, '%')))
""")
    List<Producto> filtrarProductos(
            String categoria,
            String marca,
            Double minPrecio,
            Double maxPrecio,
            String nombre
    );
}