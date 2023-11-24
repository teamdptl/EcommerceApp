package com.learn.ecommerce.Response;

import lombok.Data;

@Data
public class Response {
    private String message;
    private int error;

    public Response(String message, int error) {
        this.message = message;
        this.error = error;
    }
}
