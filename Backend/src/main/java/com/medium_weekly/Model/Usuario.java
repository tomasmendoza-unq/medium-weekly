package com.medium_weekly.Model;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id_usuario;

    private String nombre;

    private String contrasena;


    @OneToMany(mappedBy = "autor", fetch = FetchType.EAGER)
    private List<Posteos> posts;



}
