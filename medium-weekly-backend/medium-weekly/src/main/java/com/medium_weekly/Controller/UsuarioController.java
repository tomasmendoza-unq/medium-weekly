package com.medium_weekly.Controller;

import com.medium_weekly.Dto.LoginDTO;
import com.medium_weekly.Dto.UsuarioDTO;
import com.medium_weekly.Service.IUsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping("/user")
public class UsuarioController {
    @Autowired
    IUsuarioService usuarioService;

    @GetMapping
    public List<UsuarioDTO> getClientes(){
        return usuarioService.getClientes();
    }


    @GetMapping("/{id_usuario}")
    public ResponseEntity<?> getCliente(@PathVariable Long id_usuario){
        UsuarioDTO usuarioDTO = usuarioService.getUsuarioDTOById(id_usuario);
        return ResponseEntity.status(HttpStatus.FOUND).body(usuarioDTO);
    }

    @GetMapping("/login")
    public ResponseEntity<?> getLogin(@RequestBody LoginDTO log){
        UsuarioDTO usuarioDTO = usuarioService.getUsuarioDTOByLogin(log);

        return ResponseEntity.status(HttpStatus.FOUND).body(usuarioDTO);
    }

    @PostMapping("/crear")
    public ResponseEntity<?> crearCliente(@Valid @RequestBody UsuarioDTO nuevoUsuario){
        UsuarioDTO usuarioDTO = usuarioService.saveUsuario(nuevoUsuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioDTO);
    }

    @DeleteMapping("/eliminar/{id_usuario}")
    public ResponseEntity<?> deleteCliente(@PathVariable Long id_usuario){
        usuarioService.deleteUsuario(id_usuario);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Se elimino el usuario con el id: " + id_usuario);
    }

    @PutMapping("/editar/{id_usuario}")
    public ResponseEntity<?> editCliente(@PathVariable Long id_usuario,@Valid @RequestBody UsuarioDTO usuario){
        usuarioService.editUsuario(id_usuario,usuario);

        return new ResponseEntity<>("Se edito el usuario con el id: " + id_usuario, HttpStatus.OK);
    }
}
