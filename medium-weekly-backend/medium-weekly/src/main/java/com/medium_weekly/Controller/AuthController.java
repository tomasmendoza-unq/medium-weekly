package com.medium_weekly.Controller;

import com.medium_weekly.Dto.UserLoginRequest;
import com.medium_weekly.Dto.UserRegistrationRequest;
import com.medium_weekly.Model.Usuario;
import com.medium_weekly.Service.AuthService;
import com.medium_weekly.config.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class AuthController {


    private final AuthService authService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;


    public AuthController(AuthService authService, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }


    /**
     * Endpoint de registro.
     * Recibe JSON con { nombre, email, contrasena }.
     */
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserRegistrationRequest request) {
        Usuario usuario = authService.registrarUsuario(request.getNombre(), request.getEmail(), request.getContrasena());
        return ResponseEntity.ok("Usuario registrado con éxito: " + usuario.getNombre());
    }

    /**
     * Endpoint de login.
     * Recibe JSON con { email, contrasena }.
     */
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLoginRequest request) {
        Usuario usuario = authService.obtenerUsuarioPorEmail(request.getEmail());
        if (!passwordEncoder.matches(request.getContrasena(), usuario.getContrasena())) {
            return ResponseEntity.status(401).body("Contraseña incorrecta");
        }
        String token = jwtUtil.generarToken(request.getEmail());
        return ResponseEntity.ok(token);
    }






}
