package com.medium_weekly.Service;

import com.medium_weekly.Dto.PosteoDTO;
import com.medium_weekly.Exception.ResourceNotFound;
import com.medium_weekly.Model.Posteos;
import com.medium_weekly.Model.Usuario;
import com.medium_weekly.Repository.IPosteosRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PosteosService implements IPosteosService{
    @Autowired
    private IPosteosRepository posteosRepository;

    @Autowired
    private IUsuarioService usuarioService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<PosteoDTO> getPosteos() {

        return this.createDTOs(posteosRepository.findAll());
    }

    @Override
    public PosteoDTO savePosteo(PosteoDTO posteoDTO) {
        Posteos posteo = this.save(this.DTOtoPosteo(posteoDTO));
        return modelMapper.map(posteo, PosteoDTO.class);
    }


    @Override
    public void editPosteo(PosteoDTO posteoDTO) {
        Posteos posteo = this.findById(posteoDTO.getId_posteo());
        modelMapper.map(posteoDTO,posteo);

        this.save(posteo);
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
        return modelMapper.map(this.findById(idPosteo), PosteoDTO.class);
    }

    private List<PosteoDTO> createDTOs(List<Posteos> all) {
        List<PosteoDTO> posteoDTOList = new ArrayList<>();

        for (Posteos posteo: all){
            posteoDTOList.add(modelMapper.map(posteo, PosteoDTO.class));
        }

        return posteoDTOList;
    }

    private Posteos save(Posteos posteo){
        return posteosRepository.save(posteo);
    }

    private Posteos DTOtoPosteo(PosteoDTO posteoDTO) {
        Posteos posteos = modelMapper.map(posteoDTO, Posteos.class);

        posteos.setAutor(this.findAutor(posteoDTO.getIdAutor()));

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

}
