package com.medium_weekly.Service;

import com.medium_weekly.Dto.LoginDTO;
import com.medium_weekly.Dto.UsuarioDTO;
import com.medium_weekly.Exception.AuthenticationException;
import com.medium_weekly.Exception.ResourceNotFound;
import com.medium_weekly.Exception.UserAlreadyExistsException;
import com.medium_weekly.Model.Posteos;
import com.medium_weekly.Model.Usuario;
import com.medium_weekly.Repository.IUsuarioRepository;
import com.medium_weekly.config.JwtUtil;
import jakarta.validation.constraints.Null;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService implements IUsuarioService{
    @Autowired
    IUsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

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

        return posts;
    }


    @Override
    public UsuarioDTO getUsuarioDTOById(Long idUsuario) {
        UsuarioDTO usuarioDTO = modelMapper.map(this.findById(idUsuario),UsuarioDTO.class);

        return usuarioDTO;
    }


    @Override
    public UsuarioDTO saveUsuario(UsuarioDTO nuevoUsuario) {
        this.verificarSiExisteUsuario(nuevoUsuario);

        this.encriptarContraseña(nuevoUsuario);

        Usuario usuarioSave = usuarioRepository.save(modelMapper.map(nuevoUsuario,Usuario.class));

        return modelMapper.map(usuarioSave,UsuarioDTO.class);
    }

    private void encriptarContraseña(UsuarioDTO nuevoUsuario) {
         nuevoUsuario.setContrasena(passwordEncoder.encode(nuevoUsuario.getContrasena()));
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
    public String uthenticateAndGenerateToken(LoginDTO loginDTO) {
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

    private void verificarSiExisteUsuario(UsuarioDTO nuevoUsuario) {
        if(this.userExists(nuevoUsuario.getNombre())){
            throw new UserAlreadyExistsException("El usuario ya existe con este nombre");
        }

    }

    private boolean userExists(String nombre) {
        return this.findUserByName(nombre).isPresent();
    }


}
