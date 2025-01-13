package com.medium_weekly.Repository;

import com.medium_weekly.Model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByNombreAndContrasena(String Nombre, String contrasena);
}
