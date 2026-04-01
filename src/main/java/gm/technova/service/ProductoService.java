package gm.technova.service;

import gm.technova.Entity.Producto;
import gm.technova.dto.ProductoDetalleDTO;
import gm.technova.dto.ProductopresentacionDTO;
import gm.technova.mapper.ProductoMapper;
import gm.technova.repository.ProductoRepository;

import java.util.List;

public interface ProductoService {

    /*Metodos Basicos*/
    List<Producto> listar();
    Producto buscarPorId(Long id);
    Producto guardar(Producto producto);
    Producto actualizar(Long id, Producto producto);
    void eliminar(Long id);

    /*Metodos Avanzados*/

    //Obtener todos los detalles del producto
    ProductoDetalleDTO obtenerDetalle(Long id);

    //Listar Producto por categoria
    List<Producto> listarPorCategoria(Long idCategoria);

    //ListarProductosPresentacion
    List<ProductopresentacionDTO> listarProductosPresentacion();

    //Para filtrar producto parte de ProductoPresentacionDto
    List<ProductopresentacionDTO> filtrarProductos(
            String categoria,
            String marca,
            Double minPrecio,
            Double maxPrecio,
            String nombre
    );

}