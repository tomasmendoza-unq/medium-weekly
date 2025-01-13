package com.medium_weekly.Exception;

import lombok.Data;


public class ResourceNotFound extends RuntimeException{
    private Long id;
    public ResourceNotFound(Long id, String message) {
        super(message);
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
