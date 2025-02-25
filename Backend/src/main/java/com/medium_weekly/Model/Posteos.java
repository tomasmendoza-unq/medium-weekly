package com.medium_weekly.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.medium_weekly.Enums.Categoria;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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

    @Lob
    private String contenido;

    @OneToMany(mappedBy = "post")
    private List<Comentario> comentario;
    
    @CreationTimestamp
    private LocalDateTime created;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario autor;

    @Enumerated(EnumType.STRING)
    private Categoria categoria;
}
