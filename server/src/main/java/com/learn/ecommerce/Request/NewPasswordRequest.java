package com.learn.ecommerce.Request;

import lombok.Data;

@Data
public class NewPasswordRequest {
    private String oldPassword;
    private String newPassword;
}
