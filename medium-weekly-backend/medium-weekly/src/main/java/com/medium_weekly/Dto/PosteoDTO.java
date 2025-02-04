package com.medium_weekly.Dto;

import com.medium_weekly.Model.Comentario;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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

    private LocalDateTime created;

    private Long idAutor;

    private List<ComentarioDTO> comentarios;
}
