package com.medium_weekly.Controller;

import com.medium_weekly.Exception.ResourceNotFound;
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
            String fieldName = ((FieldError) error).getField(); // REALIZA UN CASTING A ERROR, TRANSFORMANDOLO A UN TIPO FIELDERROR
            String errorMessage = error.getDefaultMessage(); // OBTIENE EL MESSAGE DEL DTO

            errors.put(fieldName,errorMessage); // AGREGA AL MAP EL ERROR
        });
        return errors;
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
