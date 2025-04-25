package com.medium_weekly.Controller;

import com.medium_weekly.Dto.PosteoDTO;
import com.medium_weekly.Enums.Categoria;
import com.medium_weekly.Service.IComentarioService;
import com.medium_weekly.Service.IPosteosService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PosteosController {
    @Autowired
    IPosteosService posteosService;

    @Autowired
    IComentarioService comentarioService;

    @GetMapping("public/posteos")
    public ResponseEntity<?> getPosteos(){
        return ResponseEntity.ok(posteosService.getPosteos());
    }

    @GetMapping("public/posteos/user/{id_usuario}")
    public ResponseEntity<?> getPosteosByUser (@PathVariable Long id_usuario){
        return ResponseEntity.status(HttpStatus.FOUND).body(posteosService.getPosteosByUser(id_usuario));
    }

    @GetMapping("api/posteos/{id_posteo}")
    public ResponseEntity<?> getPosteosById (@PathVariable Long id_posteo){
        PosteoDTO posteoDTO = posteosService.getPosteoById(id_posteo);
        posteoDTO.setComentarios(comentarioService.findComentariosByPost(id_posteo));
        return ResponseEntity.status(HttpStatus.FOUND).body(posteoDTO);
    }

    @GetMapping("public/posteos/categoria/{categoria}")
    public ResponseEntity<?> getPosteosByCategoria (@PathVariable Categoria categoria){
        return ResponseEntity.status(HttpStatus.FOUND).body(posteosService.getPosteosByCategoria(categoria));
    }

    @PostMapping("api/posteos/crear")
    public ResponseEntity<?> savePosteo(@RequestBody PosteoDTO posteoDTO, HttpServletRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(posteosService.savePosteo(posteoDTO, request));
    }

    @PutMapping("api/posteos/editar")
    public ResponseEntity<?> editPosteo(@RequestBody PosteoDTO posteoDTO, HttpServletRequest request){
        posteosService.editPosteo(posteoDTO, request);
        return ResponseEntity.status(HttpStatus.OK).body("Se edito con exito el posteo");
    }

    @DeleteMapping("api/eliminar/{id_posteo}")
    public ResponseEntity<?> deletePosteo(@PathVariable Long id_posteo, HttpServletRequest request){
        posteosService.deletePosteo(id_posteo, request);
        return ResponseEntity.status(HttpStatus.OK).body("Se elimino el posteo");
    }
}
