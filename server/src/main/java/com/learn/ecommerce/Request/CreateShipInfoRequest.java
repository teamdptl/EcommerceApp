package com.learn.ecommerce.Request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class CreateShipInfoRequest {
    private int shipId = 0;
    @NotEmpty
    private String fullName;
    @NotEmpty
    private String address;
    @NotEmpty
    private String phone;
}
