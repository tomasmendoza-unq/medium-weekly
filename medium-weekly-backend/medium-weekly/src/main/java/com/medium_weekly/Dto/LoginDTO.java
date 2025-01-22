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
public class LoginDTO {

    @NotNull(message = "Nombre no puede ser null")
    @NotBlank(message = "NOMBRE REQUIRED")
    private String Nombre;

    @NotNull(message = "La contraseña no puede ser nulo")
    private String contrasena;

}
