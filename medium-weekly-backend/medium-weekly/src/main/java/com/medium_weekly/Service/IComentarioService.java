package com.medium_weekly.Service;

import com.medium_weekly.Dto.ComentarioDTO;

public interface IComentarioService {
    public ComentarioDTO saveComentario(ComentarioDTO comentarioDTO);

    public void deleteComentario(Long id);

    public void editComentario(ComentarioDTO comentarioDTO);
}
