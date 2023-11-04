package com.learn.ecommerce.Response;

import lombok.Data;

public class ErrorResponse extends Response {
    public ErrorResponse(String message) {
        super(message, 1);
    }
}
