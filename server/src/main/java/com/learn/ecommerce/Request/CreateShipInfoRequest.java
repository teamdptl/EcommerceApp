package com.learn.ecommerce.Request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class CreateShipInfoRequest {
    @NotEmpty
    private String fullName;
    @NotEmpty
    private String address;
    @NotEmpty
    private String phone;
}
