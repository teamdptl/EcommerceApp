package com.learn.ecommerce.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderCreatedResponse extends SuccessResponse{
    private String code;
    public OrderCreatedResponse(String message, String code) {
        super(message);
        this.code = code;
    }
}
