package com.learn.ecommerce.Response;

import lombok.Data;

@Data
public class ShipInfoListResponse {
    private int shipId;
    private String fullName;
    private String address;
    private String phone;
}
