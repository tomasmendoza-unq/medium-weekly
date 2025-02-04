package com.medium_weekly.Repository;

import com.medium_weekly.Model.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IComentarioRepository extends JpaRepository<Comentario, Long> {
}
