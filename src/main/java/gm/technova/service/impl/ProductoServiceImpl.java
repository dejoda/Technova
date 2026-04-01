package gm.technova.service.impl;

import gm.technova.Entity.Producto;
import gm.technova.dto.ProductoDetalleDTO;
import gm.technova.dto.ProductopresentacionDTO;
import gm.technova.mapper.ProductoMapper;
import gm.technova.repository.ProductoRepository;
import gm.technova.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoServiceImpl implements ProductoService {

    @Autowired
    private ProductoRepository repository;

    /*Metodos Basicos*/
    @Override
    public List<Producto> listar() {
        return repository.findAll();
    }

    @Override
    public Producto buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Producto guardar(Producto producto) {
        return repository.save(producto);
    }

    @Override
    public Producto actualizar(Long id, Producto producto) {
        Producto existente = repository.findById(id).orElse(null);
        if (existente != null) {
            existente.setNombre(producto.getNombre());
            existente.setPrecio(producto.getPrecio());
            existente.setStock(producto.getStock());
            return repository.save(existente);
        }
        return null;
    }

    @Override
    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    /*Metodos Complicados*/

    //Retornar Producto Con todos sus detalles
    public ProductoDetalleDTO obtenerDetalle(Long id) {
        Producto producto = repository.obtenerProductoDetalle(id);
        return ProductoMapper.toDetalleDTO(producto);
    }

    @Override
    public List<Producto> listarPorCategoria(Long idCategoria) {
        return repository.findByCategoriaIdCategoria(idCategoria);
    }

    @Override
    public List<ProductopresentacionDTO> listarProductosPresentacion() {

        return repository.findAll()
                .stream()
                .map(ProductoMapper::toPresentacionDTO)
                .toList();
    }

    @Override
    public List<ProductopresentacionDTO> filtrarProductos(String categoria, String marca, Double minPrecio, Double maxPrecio, String nombre) {
        return repository.filtrarProductos(
                        categoria, marca, minPrecio, maxPrecio, nombre
                )
                .stream()
                .map(ProductoMapper::toPresentacionDTO)
                .toList();
    }
}