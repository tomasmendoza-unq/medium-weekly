package com.medium_weekly.Dto;

import com.medium_weekly.Enums.Rol;
import lombok.Data;

@Data
public class UsuarioDTO {


    private Long id_usuario;

    private String Nombre;

    private Rol rol;

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
