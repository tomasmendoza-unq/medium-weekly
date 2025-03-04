package com.medium_weekly.Service;

import com.medium_weekly.Dto.PosteoDTO;
import com.medium_weekly.Enums.Categoria;
import com.medium_weekly.Model.Comentario;
import com.medium_weekly.Model.Posteos;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface IPosteosService {
    public List<PosteoDTO> getPosteos();

    public PosteoDTO savePosteo(PosteoDTO posteoDTO, HttpServletRequest request);

    public void editPosteo(PosteoDTO posteoDTO, HttpServletRequest request);

    public void deletePosteo(Long idPosteo, HttpServletRequest request);

    public List<PosteoDTO> getPosteosByUser(Long idUsuario);

    public PosteoDTO getPosteoById(Long idPosteo);

    public Posteos findById(Long post);

    List<Comentario> getComentarios(Long idPosteo);

    public List<PosteoDTO> getPosteosByCategoria(Categoria categoria);
}
