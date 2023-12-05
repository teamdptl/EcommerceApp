package com.learn.ecommerce.Response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.learn.ecommerce.Entity.Role;
import lombok.Data;

@Data
public class CreateUserResponse {
    private Integer id;
    private String email;
    private String fullname;
    private String avatar;
    @JsonProperty("isDeleted")
    private boolean isDeleted;
    private Role role;
}
