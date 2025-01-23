package com.medium_weekly.Service;

import com.medium_weekly.Dto.PosteoDTO;
import com.medium_weekly.Exception.ResourceNotFound;
import com.medium_weekly.Model.Posteos;
import com.medium_weekly.Model.Usuario;
import com.medium_weekly.Repository.IPosteosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PosteosService implements IPosteosService{
    @Autowired
    IPosteosRepository posteosRepository;

    @Autowired
    IUsuarioService usuarioService;

    @Override
    public List<PosteoDTO> getPosteos() {

        return this.createDTOs(posteosRepository.findAll());
    }

    private List<PosteoDTO> createDTOs(List<Posteos> all) {
        List<PosteoDTO> posteoDTOList = new ArrayList<>();

        for (Posteos posteo: all){
            posteoDTOList.add(this.createDTO(posteo));
        }

        return posteoDTOList;
    }

    private PosteoDTO createDTO(Posteos posteo) {
        return PosteoDTO.builder()
                .id_posteo(posteo.getId_posteo())
                .titulo(posteo.getTitulo())
                .resumen(posteo.getResumen())
                .src(posteo.getSrc())
                .contenido(posteo.getContenido())
                .created(posteo.getCreated())
                .idAutor(posteo.getAutor().getId_usuario())
                .build();
    }

    @Override
    public PosteoDTO savePosteo(PosteoDTO posteoDTO) {
        Posteos posteo = this.save(this.DTOtoPosteo(posteoDTO));
        return this.createDTO(posteo);
    }

    private Posteos save(Posteos posteo){
        return posteosRepository.save(posteo);
    }

    private Posteos DTOtoPosteo(PosteoDTO posteoDTO) {
        return Posteos.builder()
                .src(posteoDTO.getSrc())
                .titulo(posteoDTO.getTitulo())
                .resumen(posteoDTO.getResumen())
                .contenido(posteoDTO.getContenido())
                .autor(this.findAutor(posteoDTO.getIdAutor()))
                .build();
    }

    private Usuario findAutor(Long idUsuario) {
        return usuarioService.findById(idUsuario);
    }


    @Override
    public void editPosteo(PosteoDTO posteoDTO) {
        Posteos posteo = this.findById(posteoDTO.getId_posteo());
        this.edit(posteo,posteoDTO);

        this.save(posteo);
    }

    private void edit(Posteos posteo, PosteoDTO posteoDTO) {
        posteo.setSrc(posteoDTO.getSrc());
        posteo.setContenido(posteoDTO.getContenido());
        posteo.setResumen(posteoDTO.getResumen());
        posteo.setTitulo(posteoDTO.getTitulo());
    }

    private Posteos findById(Long idPosteo) {
        return posteosRepository.findById(idPosteo).orElseThrow(() ->
                new ResourceNotFound(idPosteo, "No se encontró el posteo con ID: " + idPosteo)
        );
    }


    @Override
    public void deletePosteo(Long idPosteo) {
        posteosRepository.delete(this.findById(idPosteo));
    }

    @Override
    public List<PosteoDTO> getPosteosByUser(Long idUsuario) {

        return this.createDTOs(usuarioService.findPost(idUsuario));
    }

    @Override
    public PosteoDTO getPosteoById(Long idPosteo) {
        return this.createDTO(this.findById(idPosteo));
    }
}
