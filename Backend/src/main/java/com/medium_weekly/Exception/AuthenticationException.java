package com.medium_weekly.Exception;



public class AuthenticationException extends RuntimeException{

    public AuthenticationException(String message) {
        super(message);
    }
}
