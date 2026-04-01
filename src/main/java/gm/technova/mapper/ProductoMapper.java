package gm.technova.mapper;


import gm.technova.dto.*;
import gm.technova.Entity.*;

import java.util.stream.Collectors;
public class ProductoMapper {

    //---
    public static ProductoDetalleDTO toDetalleDTO(Producto producto) {

        ProductoDetalleDTO dto = new ProductoDetalleDTO();

        dto.setId(producto.getIdProducto());
        dto.setNombre(producto.getNombre());
        dto.setDescripcion(producto.getDescripcion());
        dto.setPrecio(producto.getPrecio());
        dto.setStock(producto.getStock());
        dto.setCategoria(producto.getCategoria().getNombre());
        dto.setMarca(producto.getMarca());
        dto.setModelo(producto.getModelo());
        dto.setGarantia(producto.getGarantia());

        if (producto.getImagenes() != null) {
            dto.setImagenes(
                    producto.getImagenes().stream().map(img -> {
                        ProductoImagenDTO i = new ProductoImagenDTO();
                        i.setUrlImagen(img.getUrlImagen());
                        i.setPrincipal(img.getPrincipal());
                        return i;
                    }).collect(Collectors.toList())
            );
        }
        if (producto.getCaracteristicas() != null) {
            dto.setCaracteristicas(
                    producto.getCaracteristicas().stream().map(c -> {
                        ProductoCaracteristicaDTO cdto = new ProductoCaracteristicaDTO();
                        cdto.setNombre(c.getCaracteristica().getNombre());
                        cdto.setValor(c.getValor());
                        return cdto;
                    }).collect(Collectors.toList())
            );
        }
        return dto;
    }

    public static ProductopresentacionDTO toPresentacionDTO(Producto producto) {

        String imagenPrincipal = null;

        if (producto.getImagenes() != null) {
            imagenPrincipal = producto.getImagenes().stream()
                    .filter(img -> Boolean.TRUE.equals(img.getPrincipal()))
                    .map(ProductoImagen::getUrlImagen)
                    .findFirst()
                    .orElse(null);
        }

        ProductopresentacionDTO dto = new ProductopresentacionDTO();

        dto.setId(producto.getIdProducto());
        dto.setNombre(producto.getNombre());
        dto.setPrecio(producto.getPrecio());
        dto.setDescripcion(producto.getDescripcion());
        dto.setMarca(producto.getMarca()); // 👈 aquí
        dto.setCategoria(
                producto.getCategoria() != null ? producto.getCategoria().getNombre() : null
        );
        dto.setImagen(imagenPrincipal);

        return dto;
    }


}
