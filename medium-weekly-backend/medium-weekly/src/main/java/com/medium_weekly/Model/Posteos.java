package com.medium_weekly.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "posteo")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Posteos {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_posteo;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "resumen")
    private String resumen;

    private String src;

    private String contenido;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario autor;
}
