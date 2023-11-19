package com.learn.ecommerce.Request;

import lombok.Data;

@Data
public class EditShipInfoRequest {
    private String fullName;
    private String address;
    private String phone;
}
