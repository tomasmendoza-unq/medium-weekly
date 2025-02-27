package com.medium_weekly.Exception;

import lombok.Data;

@Data
public class UserAlreadyExistsException extends RuntimeException{

    public UserAlreadyExistsException( String message) {
        super(message);

    }

}
