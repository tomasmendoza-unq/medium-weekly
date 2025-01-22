package com.medium_weekly.Service;

import com.medium_weekly.Dto.LoginDTO;
import com.medium_weekly.Dto.UsuarioDTO;
import com.medium_weekly.Exception.ResourceNotFound;
import com.medium_weekly.Model.Posteos;
import com.medium_weekly.Model.Usuario;
import com.medium_weekly.Repository.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioService implements IUsuarioService{
    @Autowired
    IUsuarioRepository usuarioRepository;

    @Override
    public List<UsuarioDTO> getClientes() {
        List<UsuarioDTO> usuarioDTOList = new ArrayList<>();

        usuarioRepository.findAll().forEach(usuario -> {
            usuarioDTOList.add(this.crearDTO(usuario));
        });
        return usuarioDTOList;
    }

    private UsuarioDTO crearDTO(Usuario usuario){
        return new UsuarioDTO(
             usuario.getId_usuario(),
            usuario.getNombre(),
                usuario.getContrasena()
        );
    }

    @Override
    public Usuario findById(Long idUsuario){
        return usuarioRepository.findById(idUsuario).orElseThrow(() ->
                new ResourceNotFound(idUsuario, "No se encontró al cliente con ID: " + idUsuario)
        );
    }

    @Override
    public List<Posteos> findPost(Long idUsuario) {
        return this.findById(idUsuario).getPosts();
    }

    @Override
    public UsuarioDTO getUsuarioDTOById(Long idUsuario) {
        UsuarioDTO usuarioDTO = this.crearDTO(this.findById(idUsuario));

        return usuarioDTO;
    }


    @Override
    public UsuarioDTO saveUsuario(UsuarioDTO nuevoUsuario) {
        Usuario usuario = new Usuario(nuevoUsuario.getNombre(),nuevoUsuario.getContrasena());
        Usuario usuarioSave = usuarioRepository.save(usuario);

        return this.crearDTO(usuarioSave);
    }

    @Override
    public void deleteUsuario(Long idUsuario) {
        Usuario usuario = this.findById(idUsuario);
        usuarioRepository.delete(usuario);
    }

    @Override
    public void editUsuario(Long idUsuario, UsuarioDTO usuarioDto) {
        Usuario usuario = this.findById(idUsuario);
        this.updateUsuario(usuario,usuarioDto);

        usuarioRepository.save(usuario);
    }

    @Override
    public UsuarioDTO getUsuarioDTOByLogin(LoginDTO log) {
        return this.crearDTO(usuarioRepository.findByNombreAndContrasena(log.getNombre(),log.getContrasena()).orElseThrow());
    }



    private void updateUsuario(Usuario usuario, UsuarioDTO usuarioDto) {
        usuario.setNombre(usuarioDto.getNombre());

        usuario.setContrasena(usuarioDto.getContrasena());
    }
}
