package com.learn.ecommerce.Request;

import lombok.Data;

@Data
public class CreateShipInfoRequest {
    private int shipId = 0;
    private String fullName;
    private String address;
    private String phone;
}
