package com.medium_weekly.Dto;

import com.medium_weekly.Enums.Rol;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class LoginDTO {

    @NotNull(message = "Nombre no puede ser null")
    @NotBlank(message = "NOMBRE REQUIRED")
    private String Nombre;

    @NotNull(message = "La contraseña no puede ser nulo")
    private String contrasena;

    public LoginDTO(String nombre, String contrasena) {
        Nombre = nombre;
        this.contrasena = contrasena;
    }

    public @NotNull(message = "Nombre no puede ser null") @NotBlank(message = "NOMBRE REQUIRED") String getNombre() {
        return Nombre;
    }

    public @NotNull(message = "La contraseña no puede ser nulo") String getContrasena() {
        return contrasena;
    }
}
