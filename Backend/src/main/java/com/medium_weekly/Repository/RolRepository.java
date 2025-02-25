package com.medium_weekly.Repository;

import com.medium_weekly.Model.NombreRol;
import com.medium_weekly.Model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RolRepository extends JpaRepository<Rol, Long> {


    Optional<Rol> findByNombreRol(NombreRol nombreRol);


}
