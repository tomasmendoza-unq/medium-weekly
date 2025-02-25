package com.medium_weekly.Service;


import com.medium_weekly.Model.NombreRol;
import com.medium_weekly.Model.Rol;
import com.medium_weekly.Model.Usuario;
import com.medium_weekly.Repository.IUsuarioRepository;
import com.medium_weekly.Repository.RolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final IUsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;


    /**
     * Registra un usuario con nombre, email y contraseña.
     * Si el email es "useradmin@gmail.com", se le asigna además el rol de administrador.
     */
    public Usuario registrarUsuario(String nombre, String email, String contrasena) {
        if (usuarioRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("El usuario ya existe con ese email");
        }

        // Encriptar la contraseña
        String contrasenaEncriptada = passwordEncoder.encode(contrasena);

        // Asignar rol de usuario siempre
        Set<Rol> roles = new HashSet<>();
        Rol userRole = rolRepository.findByNombreRol(NombreRol.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Rol de usuario no encontrado"));
        roles.add(userRole);

        // Si el email es "useradmin@gmail.com", asignar rol de administrador
        if(email.equalsIgnoreCase("useradmin@gmail.com")) {
            Rol adminRole = rolRepository.findByNombreRol(NombreRol.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Rol de administrador no encontrado"));
            roles.add(adminRole);
        }

        Usuario usuario = new Usuario(nombre, email, contrasenaEncriptada); // Correcto ✅
        usuario.setRoles(roles);
        return usuarioRepository.save(usuario);
    }

    public Usuario obtenerUsuarioPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }





}
