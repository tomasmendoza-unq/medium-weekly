package com.medium_weekly.Repository;

import com.medium_weekly.Model.Posteos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPosteosRepository extends JpaRepository<Posteos, Long> {
}
