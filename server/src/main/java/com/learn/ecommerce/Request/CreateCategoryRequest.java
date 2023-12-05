package com.learn.ecommerce.Request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class CreateCategoryRequest {
                @NotEmpty
                private String name;
                @NotEmpty
                private String description;
}
