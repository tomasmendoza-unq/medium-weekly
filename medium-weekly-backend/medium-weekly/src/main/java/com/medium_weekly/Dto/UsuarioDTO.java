package com.medium_weekly.Dto;
import com.medium_weekly.Enums.Rol;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
@Data
public class UsuarioDTO {


    private Long id_usuario;

    @NotNull(message = "Nombre no puede ser null")
    @NotBlank(message = "NOMBRE REQUIRED")
    private String Nombre;

    @NotNull(message = "El rol no puede ser nulo")
    private Rol rol;

    @NotNull(message = "La contraseña no puede ser nulo")
    private String contrasena;

    public UsuarioDTO(Long id,String nombre, Rol rol, String contrasena) {
        this.id_usuario = id;
        Nombre = nombre;
        this.rol = rol;
        this.contrasena = contrasena;
    }

    public UsuarioDTO() {
    }

    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
    }

    public void setNombre(String nombre) {
        Nombre = nombre;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public Long getId_usuario() {
        return id_usuario;
    }

    public String getNombre() {
        return Nombre;
    }

    public Rol getRol() {
        return rol;
    }

    public String getContrasena() {
        return contrasena;
    }
}
