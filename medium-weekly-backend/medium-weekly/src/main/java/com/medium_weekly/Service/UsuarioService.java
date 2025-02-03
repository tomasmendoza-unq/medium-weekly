package com.medium_weekly.Service;

import com.medium_weekly.Dto.LoginDTO;
import com.medium_weekly.Dto.UsuarioDTO;
import com.medium_weekly.Exception.ResourceNotFound;
import com.medium_weekly.Model.Posteos;
import com.medium_weekly.Model.Usuario;
import com.medium_weekly.Repository.IUsuarioRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioService implements IUsuarioService{
    @Autowired
    IUsuarioRepository usuarioRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<UsuarioDTO> getClientes() {
        List<UsuarioDTO> usuarioDTOList = new ArrayList<>();

        usuarioRepository.findAll().forEach(usuario -> {
            usuarioDTOList.add(modelMapper.map(usuario,UsuarioDTO.class));
        });
        return usuarioDTOList;
    }

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
        if (posts == null || posts.isEmpty()) {
            throw new ResourceNotFound(idUsuario, "El usuario no tiene posteos asociados");
        }
        return posts;
    }

    @Override
    public UsuarioDTO getUsuarioDTOById(Long idUsuario) {
        UsuarioDTO usuarioDTO = modelMapper.map(this.findById(idUsuario),UsuarioDTO.class);

        return usuarioDTO;
    }


    @Override
    public UsuarioDTO saveUsuario(UsuarioDTO nuevoUsuario) {
        Usuario usuarioSave = usuarioRepository.save(modelMapper.map(nuevoUsuario,Usuario.class));

        return modelMapper.map(usuarioSave,UsuarioDTO.class);
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

    @Override
    public UsuarioDTO getUsuarioDTOByLogin(LoginDTO log) {
        return modelMapper.map(this.findByLog(log),UsuarioDTO.class);
    }

    private  Usuario findByLog(LoginDTO log) {

        return usuarioRepository.findByNombreAndContrasena(log.getNombre(),log.getContrasena()).orElseThrow();
    }



}
