package com.learn.ecommerce.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ChangePasswordRequest {

    private String code;
    private String newPassword;
    private String confirmationPassword;
}
