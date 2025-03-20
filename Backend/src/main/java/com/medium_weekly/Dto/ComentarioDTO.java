package com.medium_weekly.Dto;


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
public class ComentarioDTO {

    private Long id;

    @NotNull(message = "textr no puede ser null")
    @NotBlank(message = "text REQUIRED")
    private String text;

    @NotNull(message = "id autor no puede ser null")
    @NotBlank(message = "id autor REQUIRED")
    private Long autor;

    private String nombreAutor;

    @NotNull(message = "id post no puede ser null")
    @NotBlank(message = "id post REQUIRED")
    private Long post;
}
