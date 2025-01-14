package com.medium_weekly.Service;

import com.medium_weekly.Dto.LoginDTO;
import com.medium_weekly.Dto.UsuarioDTO;

import java.util.List;

public interface IUsuarioService {
    List<UsuarioDTO> getClientes();

    UsuarioDTO getUsuarioDTOById(Long idUsuario);

    UsuarioDTO saveUsuario(UsuarioDTO nuevoUsuario);

    void deleteUsuario(Long idUsuario);

    void editUsuario(Long idUsuario, UsuarioDTO usuario);

    UsuarioDTO getUsuarioDTOByLogin(LoginDTO log);
}
