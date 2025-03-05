package com.medium_weekly.Controller;

import com.medium_weekly.Dto.LoginDTO;
import com.medium_weekly.Dto.UsuarioDTO;
import com.medium_weekly.Service.IAuthService;
import com.medium_weekly.Service.impl.TokenBlacklistService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private IAuthService authService;


    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginDTO loginDTO) {

        return ResponseEntity.status(HttpStatus.OK).body(authService.authenticateAndGenerateToken(loginDTO));
    }

    @PostMapping("/register")
    public ResponseEntity<?> crearCliente(@Valid @RequestBody UsuarioDTO nuevoUsuario){
        UsuarioDTO usuarioDTO = authService.registerUsuario(nuevoUsuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioDTO);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        authService.logout(request);
        return ResponseEntity.status(HttpStatus.OK).body("Has cerrado sesión correctamente.");
    }

}
