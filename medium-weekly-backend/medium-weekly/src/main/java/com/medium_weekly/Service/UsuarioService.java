package com.medium_weekly.Service;

import com.medium_weekly.Dto.UsuarioDTO;
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
            usuario.getRol(),
                usuario.getContrasena()
        );
    }

    private Usuario findById(long idUsuario){
        return usuarioRepository.findById(idUsuario).orElse(null);
    }

    @Override
    public UsuarioDTO getUsuarioDTOById(Long idUsuario) {
        UsuarioDTO usuarioDTO = this.crearDTO(this.findById(idUsuario));

        return usuarioDTO;
    }


    @Override
    public UsuarioDTO saveUsuario(UsuarioDTO nuevoUsuario) {
        Usuario usuario = new Usuario(nuevoUsuario.getNombre(), nuevoUsuario.getRol(),nuevoUsuario.getContrasena());
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

    private void updateUsuario(Usuario usuario, UsuarioDTO usuarioDto) {
        usuario.setNombre(usuarioDto.getNombre());
        usuario.setRol(usuarioDto.getRol());
        usuario.setContrasena(usuarioDto.getContrasena());
    }
}
