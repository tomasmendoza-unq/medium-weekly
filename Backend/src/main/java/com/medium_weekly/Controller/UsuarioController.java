package com.medium_weekly.Controller;

import com.medium_weekly.Dto.LoginDTO;
import com.medium_weekly.Dto.UsuarioDTO;
import com.medium_weekly.Service.IUsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
/*
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.User;
*/

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/user")
public class UsuarioController {
    @Autowired
    private IUsuarioService usuarioService;

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
