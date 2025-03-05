package com.medium_weekly.Dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
public class JWTDetailsDTO {

    private Long id_usuario;

    @NotNull(message = "Nombre no puede ser null")
    @NotBlank(message = "NOMBRE REQUIRED")

    private String nombre;



}
