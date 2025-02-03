package com.medium_weekly.Service;

import com.medium_weekly.Dto.ComentarioDTO;
import com.medium_weekly.Exception.ResourceNotFound;
import com.medium_weekly.Model.Comentario;
import com.medium_weekly.Repository.IComentarioRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComentarioService implements IComentarioService {

    @Autowired
    private IUsuarioService usuarioService;

    @Autowired
    private IPosteosService posteosService;

    @Autowired
    private IComentarioRepository comentarioRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ComentarioDTO saveComentario(ComentarioDTO comentarioDTO) {
        return modelMapper.map(this.saveByDTO(comentarioDTO), ComentarioDTO.class);
    }

    @Override
    public void deleteComentario(Long id) {
        Comentario comentario = this.findById(id);
        comentarioRepository.delete(comentario);
    }

    @Override
    public void editComentario(ComentarioDTO comentarioDTO) {
        Comentario comentario = this.findById(comentarioDTO.getId());

        modelMapper.map(comentarioDTO,comentario);
        comentarioRepository.save(comentario);
    }

    private Comentario saveByDTO(ComentarioDTO comentarioDTO) {
        return comentarioRepository.save(this.DtoToModel(comentarioDTO));
    }

    private Comentario DtoToModel(ComentarioDTO comentarioDTO) {
        Comentario comentario = modelMapper.map(comentarioDTO, Comentario.class);

        comentario.setUsuario(usuarioService.findById(comentarioDTO.getAutor()));
        comentario.setPost(posteosService.findById(comentarioDTO.getPost()));

        return comentario;
    }

    private Comentario findById(Long id) {
        return comentarioRepository.findById(id).orElseThrow(() ->
                new ResourceNotFound(id, "No se encontró al comentario con ID: " + id)
        );
    }
}
