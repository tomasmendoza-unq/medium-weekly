package com.medium_weekly.Service.impl;

import com.medium_weekly.Dto.PosteoDTO;
import com.medium_weekly.Enums.Categoria;
import com.medium_weekly.Exception.ResourceNotFound;
import com.medium_weekly.Model.Comentario;
import com.medium_weekly.Model.Posteos;
import com.medium_weekly.Model.Usuario;
import com.medium_weekly.Repository.IPosteosRepository;
import com.medium_weekly.Service.IComentarioService;
import com.medium_weekly.Service.IPosteosService;
import com.medium_weekly.Service.IUsuarioService;
import com.medium_weekly.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PosteosService implements IPosteosService {
    @Lazy
    @Autowired
    private IComentarioService comentarioService;

    @Autowired
    private IPosteosRepository posteosRepository;

    @Autowired
    private IUsuarioService usuarioService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public List<PosteoDTO> getPosteos() {

        return this.createDTOs(posteosRepository.findAll());
    }

    @Override
    public PosteoDTO savePosteo(PosteoDTO posteoDTO, HttpServletRequest request) {
        Posteos posteo = this.save(this.DTOtoPosteo(posteoDTO, jwtUtil.extraerToken(request)));
        return modelMapper.map(posteo, PosteoDTO.class);
    }


    @Override
    public void editPosteo(PosteoDTO posteoDTO, HttpServletRequest request) {
        Posteos posteo = this.findById(posteoDTO.getId_posteo());
        modelMapper.map(posteoDTO,posteo);

        this.save(posteo);
    }

    @Override
    public void deletePosteo(Long idPosteo, HttpServletRequest request) {
        posteosRepository.delete(this.findById(idPosteo));
    }

    @Transactional
    @Override
    public List<PosteoDTO> getPosteosByUser(Long idUsuario) {

        return this.createDTOs(usuarioService.findPost(idUsuario));
    }

    @Override
    public PosteoDTO getPosteoById(Long idPosteo) {
        return modelMapper.map(this.findById(idPosteo), PosteoDTO.class);
    }

    @Transactional

    private List<PosteoDTO> createDTOs(List<Posteos> all) {
        List<PosteoDTO> posteoDTOList = new ArrayList<>();

        for (Posteos posteo: all){
            PosteoDTO posteoDTO = modelMapper.map(posteo, PosteoDTO.class);
            posteoDTO.setComentarios(comentarioService.comentariosToDTO(posteo.getComentario()));
            posteoDTOList.add(posteoDTO);
        }

        return posteoDTOList;
    }

    private Posteos save(Posteos posteo){
        return posteosRepository.save(posteo);
    }

    private Posteos DTOtoPosteo(PosteoDTO posteoDTO, String token) {
        Posteos posteos = modelMapper.map(posteoDTO, Posteos.class);

        posteos.setAutor(this.findAutor(jwtUtil.extraerId(token)));

        return posteos;
    }

    private Usuario findAutor(Long idUsuario) {
        return usuarioService.findById(idUsuario);
    }

    @Override
    public Posteos findById(Long idPosteo) {
        return posteosRepository.findById(idPosteo).orElseThrow(() ->
                new ResourceNotFound(idPosteo, "No se encontró el posteo con ID: " + idPosteo)
        );
    }

    @Override
    @Transactional
    public List<Comentario> getComentarios(Long idPosteo) {
        Posteos post = this.findById(idPosteo);

        post.getComentario().size();

        return post.getComentario();
    }

    @Override
    public List<PosteoDTO> getPosteosByCategoria(Categoria categoria) {
        return this.createDTOs(posteosRepository.findByCategoria(categoria));
    }

}
