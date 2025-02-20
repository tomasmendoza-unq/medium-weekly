package com.medium_weekly.Repository;

import com.medium_weekly.Model.Usuario;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUsuarioRepository extends JpaRepository<Usuario, Long> {
    @EntityGraph(attributePaths = {"posts"})
    Optional<Usuario> findById(Long id);


    Optional<Usuario> findByNombreAndContrasena(String Nombre, String contrasena);


    Optional<Usuario> findByNombre(String nombre);

    Optional<Usuario> findByEmail(String email);




}
