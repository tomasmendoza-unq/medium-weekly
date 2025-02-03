package com.medium_weekly.Service;

import com.medium_weekly.Dto.PosteoDTO;
import com.medium_weekly.Model.Posteos;

import java.net.URI;
import java.util.List;

public interface IPosteosService {
    public List<PosteoDTO> getPosteos();

    public PosteoDTO savePosteo(PosteoDTO posteoDTO);

    public void editPosteo(PosteoDTO posteoDTO);

    public void deletePosteo(Long idPosteo);

    public List<PosteoDTO> getPosteosByUser(Long idUsuario);

    public PosteoDTO getPosteoById(Long idPosteo);

    public Posteos findById(Long post);
}
