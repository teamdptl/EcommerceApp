package com.learn.ecommerce.Request;

import com.learn.ecommerce.Entity.Role;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateUserRequest {
    @NotEmpty
    private String email;
    @NotEmpty
    private String password;
    @NotEmpty
    private String fullname;

    private Boolean isDeleted;

    private String avatar = null;
    private String locate = null;
    private String username = null;

    private String role;

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}
