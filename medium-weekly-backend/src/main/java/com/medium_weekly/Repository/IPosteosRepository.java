package com.medium_weekly.Repository;

import com.medium_weekly.Enums.Categoria;
import com.medium_weekly.Model.Posteos;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IPosteosRepository extends JpaRepository<Posteos, Long> {
    @EntityGraph(attributePaths = {"comentario"})
    List<Posteos> findAll();
    @EntityGraph(attributePaths = {"comentario"})
    List<Posteos> findByCategoria(Categoria categoria);
}
