package com.medium_weekly.Service.impl;

import com.medium_weekly.Dto.UsuarioDTO;
import com.medium_weekly.Exception.ResourceNotFound;
import com.medium_weekly.Model.Posteos;
import com.medium_weekly.Model.Usuario;
import com.medium_weekly.Repository.IUsuarioRepository;
import com.medium_weekly.Service.IAuthService;
import com.medium_weekly.Service.IUsuarioService;
import com.medium_weekly.security.JwtUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioService implements IUsuarioService {
    @Autowired
    IUsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IAuthService authService;


    @Override
    public Usuario findById(Long idUsuario){
        return usuarioRepository.findById(idUsuario).orElseThrow(() ->
                new ResourceNotFound(idUsuario, "No se encontró al cliente con ID: " + idUsuario)
        );
    }

    @Override
    public List<Posteos> findPost(Long idUsuario) {
        Usuario usuario = this.findById(idUsuario);
        List<Posteos> posts = usuario.getPosts();

        return posts;
    }



    @Override
    public void deleteUsuario(Long idUsuario) {
        Usuario usuario = this.findById(idUsuario);
        usuarioRepository.delete(usuario);
    }

    @Override
    public void editUsuario(Long idUsuario, UsuarioDTO usuarioDto) {
        Usuario usuario = this.findById(idUsuario);
        modelMapper.map(usuarioDto,usuario);

        usuarioRepository.save(usuario);
    }



}
