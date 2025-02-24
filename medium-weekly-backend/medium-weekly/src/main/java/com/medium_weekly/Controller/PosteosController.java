package com.medium_weekly.Controller;

import com.medium_weekly.Dto.PosteoDTO;
import com.medium_weekly.Enums.Categoria;
import com.medium_weekly.Service.IComentarioService;
import com.medium_weekly.Service.IPosteosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/posteos")
public class PosteosController {
    @Autowired
    IPosteosService posteosService;

    @Autowired
    IComentarioService comentarioService;

    @GetMapping
    public ResponseEntity<?> getPosteos(){
        return ResponseEntity.ok(posteosService.getPosteos());
    }

    @GetMapping("user/{id_usuario}")
    public ResponseEntity<?> getPosteosByUser (@PathVariable Long id_usuario){
        return ResponseEntity.status(HttpStatus.FOUND).body(posteosService.getPosteosByUser(id_usuario));
    }

    @GetMapping("/{id_posteo}")
    public ResponseEntity<?> getPosteosById (@PathVariable Long id_posteo){
        PosteoDTO posteoDTO = posteosService.getPosteoById(id_posteo);
        posteoDTO.setComentarios(comentarioService.findComentariosByPost(id_posteo));
        return ResponseEntity.status(HttpStatus.FOUND).body(posteoDTO);
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<?> getPosteosByCategoria (@PathVariable Categoria categoria){
        return ResponseEntity.status(HttpStatus.FOUND).body(posteosService.getPosteosByCategoria(categoria));
    }

    @PostMapping("/crear")
    public ResponseEntity<?> savePosteo(@RequestBody PosteoDTO posteoDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(posteosService.savePosteo(posteoDTO));
    }

    @PutMapping("/editar")
    public ResponseEntity<?> editPosteo(@RequestBody PosteoDTO posteoDTO){
        posteosService.editPosteo(posteoDTO);
        return ResponseEntity.status(HttpStatus.OK).body("Se edito con exito el posteo");
    }

    @DeleteMapping("/eliminar/{id_posteo}")
    public ResponseEntity<?> deletePosteo(@PathVariable Long id_posteo){
        posteosService.deletePosteo(id_posteo);
        return ResponseEntity.status(HttpStatus.OK).body("Se elimino el posteo");
    }
}
