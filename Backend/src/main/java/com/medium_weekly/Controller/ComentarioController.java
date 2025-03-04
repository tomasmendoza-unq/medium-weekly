package com.medium_weekly.Controller;

import com.medium_weekly.Dto.ComentarioDTO;
import com.medium_weekly.Service.IComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comentario")
public class ComentarioController {
    @Autowired
    private IComentarioService comentarioServices;


    @PostMapping("/crear")
    public ResponseEntity<?> crearComentario(@RequestBody ComentarioDTO comentarioDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(comentarioServices.saveComentario(comentarioDTO));
    }

    @PutMapping("/editar")
    public ResponseEntity<?> editarComentario(@RequestBody ComentarioDTO comentarioDTO){
        comentarioServices.editComentario(comentarioDTO);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Se edito con exito el comentario");
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarComentario(@PathVariable Long id){
        comentarioServices.deleteComentario(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Se elimino con exito el comentario");
    }

}
