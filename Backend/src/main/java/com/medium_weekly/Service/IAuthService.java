package com.medium_weekly.Service;

import com.medium_weekly.Dto.LoginDTO;
import com.medium_weekly.Dto.UsuarioDTO;
import com.medium_weekly.Exception.AuthenticationException;
import com.medium_weekly.Exception.UserAlreadyExistsException;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

@Service
public interface IAuthService {
    String authenticateAndGenerateToken(LoginDTO loginDTO) throws AuthenticationException;

    void verificarSiExisteUsuario(UsuarioDTO nuevoUsuario) throws UserAlreadyExistsException;

    void encriptarContraseña(UsuarioDTO nuevoUsuario);

    UsuarioDTO registerUsuario(UsuarioDTO nuevoUsuario);

    void logout(HttpServletRequest request) ;
}
