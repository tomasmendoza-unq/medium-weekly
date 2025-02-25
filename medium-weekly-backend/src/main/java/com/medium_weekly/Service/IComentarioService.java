package com.medium_weekly.Service;

import com.medium_weekly.Dto.ComentarioDTO;
import com.medium_weekly.Model.Comentario;

import java.util.List;

public interface IComentarioService {
    public ComentarioDTO saveComentario(ComentarioDTO comentarioDTO);

    public void deleteComentario(Long id);

    public void editComentario(ComentarioDTO comentarioDTO);

    List<ComentarioDTO> findComentariosByPost(Long idPosteo);

    List<ComentarioDTO> comentariosToDTO(List<Comentario> comentario);
}
