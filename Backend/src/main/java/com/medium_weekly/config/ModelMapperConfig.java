package com.medium_weekly.config;

import com.medium_weekly.Dto.ComentarioDTO;
import com.medium_weekly.Dto.PosteoDTO;
import com.medium_weekly.Dto.UsuarioDTO;
import com.medium_weekly.Model.Comentario;
import com.medium_weekly.Model.Posteos;
import com.medium_weekly.Model.Usuario;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();




        modelMapper.addMappings(new PropertyMap<PosteoDTO, Posteos>() {
            @Override
            protected void configure() {
                skip(destination.getAutor());
            }
        });

        modelMapper.addMappings(new PropertyMap<Comentario, ComentarioDTO>() {
            @Override
            protected void configure() {
                map().setAutor(source.getUsuario().getId_usuario());
                map().setPost(source.getPost().getId_posteo());
            }
        });



        return modelMapper;
    }
}