package com.learn.ecommerce.Request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class CreateBrandRequest {
    @NotEmpty
    private String name;
}
