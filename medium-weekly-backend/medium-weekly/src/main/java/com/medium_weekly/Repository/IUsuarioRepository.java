package com.medium_weekly.Repository;

import com.medium_weekly.Model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUsuarioRepository extends JpaRepository<Usuario, Long> {

}
