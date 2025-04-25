package com.medium_weekly.Service.impl;

import com.medium_weekly.Dto.LoginDTO;
import com.medium_weekly.Dto.UsuarioDTO;
import com.medium_weekly.Exception.AuthenticationException;
import com.medium_weekly.Exception.BadRequest;
import com.medium_weekly.Exception.UserAlreadyExistsException;
import com.medium_weekly.Model.Usuario;
import com.medium_weekly.Repository.IUsuarioRepository;
import com.medium_weekly.Service.IAuthService;
import com.medium_weekly.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService implements IAuthService {

    @Autowired
    IUsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ModelMapper modelMapper;


    @Autowired
    private TokenBlacklistService tokenBlacklistService;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String authenticateAndGenerateToken(LoginDTO loginDTO) {
        if (!this.userExists(loginDTO.getNombre())) {
            throw new AuthenticationException("Usuario o contraseña incorrectos");
        }

        Usuario usuario = this.findUserByName(loginDTO.getNombre()).get();

        if (!this.passwordMatches(loginDTO.getContrasena(), usuario.getContrasena())) {
            throw new AuthenticationException("Usuario o contraseña incorrectos");
        }

        return jwtUtil.generarToken(usuario);
    }


    private boolean passwordMatches(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }


    private Optional<Usuario> findUserByName(String name) {
        return usuarioRepository.findByNombre(name);
    }

    @Override
    public void verificarSiExisteUsuario(UsuarioDTO nuevoUsuario) {
        if(this.userExists(nuevoUsuario.getNombre())){
            throw new UserAlreadyExistsException("El usuario ya existe con este nombre");
        }

    }

    @Override
    public UsuarioDTO registerUsuario(UsuarioDTO nuevoUsuario) {
        verificarSiExisteUsuario(nuevoUsuario);

        encriptarContraseña(nuevoUsuario);

        Usuario usuarioSave = usuarioRepository.save(modelMapper.map(nuevoUsuario,Usuario.class));

        return modelMapper.map(usuarioSave,UsuarioDTO.class);
    }

    @Override
    public void logout(HttpServletRequest request) {

            tokenBlacklistService.addTokenToBlacklist(jwtUtil.extraerToken(request));
    }


    @Override
    public void encriptarContraseña(UsuarioDTO nuevoUsuario) {
        nuevoUsuario.setContrasena(passwordEncoder.encode(nuevoUsuario.getContrasena()));
    }

    private boolean userExists(String nombre) {
        return this.findUserByName(nombre).isPresent();
    }


}
