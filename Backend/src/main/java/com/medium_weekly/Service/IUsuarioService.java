package com.medium_weekly.Service;

import com.medium_weekly.Dto.JWTDetailsDTO;
import com.medium_weekly.Dto.LoginDTO;
import com.medium_weekly.Dto.UsuarioDTO;
import com.medium_weekly.Model.Posteos;
import com.medium_weekly.Model.Usuario;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface IUsuarioService {

    void deleteUsuario(Long idUsuario);

    void editUsuario(Long idUsuario, UsuarioDTO usuario);

    Usuario findById(Long idUsuario);

    List<Posteos> findPost(Long idUsuario);

    JWTDetailsDTO detailsUserJwt(HttpServletRequest request);

    UsuarioDTO findByIdDTO(Long idUsuario);
}
