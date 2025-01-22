package com.medium_weekly.Dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PosteoDTO {

    private Long id_posteo;

    @NotNull(message = "Titulo no puede ser null")
    @NotBlank(message = "TITULO REQUIRED")
    private String titulo;

    @NotNull(message = "Resumen no puede ser null")
    @NotBlank(message = "Resumen REQUIRED")
    private String resumen;

    @NotNull(message = "SRC no puede ser null")
    @NotBlank(message = "SRC REQUIRED")
    private String src;

    @NotNull(message = "Contenido no puede ser null")
    @NotBlank(message = "Contenido REQUIRED")
    private String contenido;

    private Long idAutor;
}
