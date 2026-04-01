package gm.technova.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductopresentacionDTO {
    private Long id;
    private String nombre;
    private Double precio;
    private String categoria;
    private String descripcion;
    private String marca;
    private String imagen;
}
