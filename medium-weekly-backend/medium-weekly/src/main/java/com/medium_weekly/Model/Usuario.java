package com.medium_weekly.Model;

import com.medium_weekly.Enums.Rol;
import jakarta.persistence.*;

import lombok.Data;

@Entity @Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id_usuario;

    private String nombre;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    private String contrasena;

    public Usuario() {
    }

    public Usuario(String nombre, Rol rol, String contrasena) {
        this.nombre = nombre;
        this.rol = rol;
        this.contrasena = contrasena;
    }

    public Long getId_usuario() {
        return id_usuario;
    }

    public String getNombre() {
        return nombre;
    }

    public Rol getRol() {
        return rol;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
}
