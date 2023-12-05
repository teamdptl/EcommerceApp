package com.learn.ecommerce.Request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class CreateUserEditRequest {
    @NotEmpty
    private String email;

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
