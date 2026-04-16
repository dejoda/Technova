package gm.technova.controller;

import gm.technova.Entity.Producto;
import gm.technova.dto.ProductoDetalleDTO;
import gm.technova.dto.ProductopresentacionDTO;
import gm.technova.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    private ProductoService service;

    /*Endpoints Basicos*/
    @GetMapping()
    public List<Producto> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Producto buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public Producto guardar(@RequestBody Producto producto) {
        return service.guardar(producto);
    }

    @PutMapping("/{id}")
    public Producto actualizar(@PathVariable Long id, @RequestBody Producto producto) {
        return service.actualizar(id, producto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }

    /*Endpoints Avanzados*/


    // Obtener detalle completo del producto
    @GetMapping("/{id}/detalle")
    public ProductoDetalleDTO obtenerDetalle(@PathVariable Long id) {
        return service.obtenerDetalle(id);
    }
    /*ARCHIVOS USADOR --> ProductoController,ProductoMapper,ProductoRepository,ProductoServiceImpl,
                            ProductoService,ProductoDetalleDTO,ProductoImagen,ProductoCaracteristica,Producto*/

    //Obtener Productos por Categoria

    @GetMapping("/categoria/{id}")
    public List<Producto> listarPorCategoria(@PathVariable Long id) {
        return service.listarPorCategoria(id);
    }

    //listarproductosPresentacion mas filtrados
    ///productos/presentacion?categoria=Laptops
    /// /productos/presentacion?marca=ASUS
    /// /productos/presentacion?minPrecio=2000&maxPrecio=4000
    @GetMapping("/presentacion")
    public List<ProductopresentacionDTO> listarProductos(
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) Double minPrecio,
            @RequestParam(required = false) Double maxPrecio,
            @RequestParam(required = false) String nombre
    ) {

        return service.filtrarProductos(
                categoria, marca, minPrecio, maxPrecio, nombre
        );
    }

    @GetMapping("/marcas")
    public List<String> listarMarcas() {
        return service.listarMarcas();
    }
}