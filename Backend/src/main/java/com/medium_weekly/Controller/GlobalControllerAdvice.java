package com.medium_weekly.Controller;

import com.medium_weekly.Exception.AuthenticationException;
import com.medium_weekly.Exception.BadRequest;
import com.medium_weekly.Exception.ResourceNotFound;
import com.medium_weekly.Exception.UserAlreadyExistsException;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalControllerAdvice {



    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleConstraintViolationException(MethodArgumentNotValidException ex) {
        Map<String, String> responses = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((response) -> {
            String fieldName = ((FieldError) response).getField();
            String responseMessage = response.getDefaultMessage();

            responses.put(fieldName,responseMessage);
        });
        return responses;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadRequest.class)
    public Map<String, String> handlerBadRequestException( BadRequest ex){
        Map<String, String> response = new HashMap<>();

        response.put("Message", ex.getMessage());

        return response;
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(UserAlreadyExistsException.class)
    public Map<String, String> handlerUserAlreadyExistsException(UserAlreadyExistsException ex){
        Map<String, String> response = new HashMap<>();

        response.put("Message", ex.getMessage());

        return response;
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(AuthenticationException.class)
    public Map<String,String> handlerAuthenticationException(AuthenticationException ex){
        Map<String, String> response = new HashMap<>();

        response.put("Message", ex.getMessage());

        return response;
    }



    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFound.class)
    public Map<String, String> handleNotFoundResource(ResourceNotFound ex){
        Map<String, String> response = new HashMap<>();

        response.put("Message",ex.getMessage());
        response.put("Id", ex.getId().toString());
        return response;

    }
}
