package com.medium_weekly.Controller;

import com.medium_weekly.Exception.AuthenticationException;
import com.medium_weekly.Exception.ResourceNotFound;
import com.medium_weekly.Exception.UserAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalControllerAdvice {



    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleConstraintViolationException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();

            errors.put(fieldName,errorMessage);
        });
        return errors;
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(UserAlreadyExistsException.class)
    public Map<String, String> handlerUserAlreadyExistsException(UserAlreadyExistsException ex){
        Map<String, String> error = new HashMap<>();

        error.put("Message", ex.getMessage());

        return error;
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(AuthenticationException.class)
    public Map<String,String> handlerAuthenticationException(AuthenticationException ex){
        Map<String, String> error = new HashMap<>();

        error.put("Message", ex.getMessage());

        return error;
    }


    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFound.class)
    public Map<String, String> handleNotFoundResource(ResourceNotFound ex){
        Map<String, String> error = new HashMap<>();

        error.put("Message",ex.getMessage());
        error.put("Id", ex.getId().toString());
        return error;

    }
}
