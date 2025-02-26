package com.medium_weekly.Exception;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class ResourceNotFound extends RuntimeException{
    private Long id;
    public ResourceNotFound(Long id, String message) {
        super(message);
        this.id = id;
    }

    public ResourceNotFound(Long id) {
        super("Resource not found for ID: " + id);
        this.id = id;
    }

}
