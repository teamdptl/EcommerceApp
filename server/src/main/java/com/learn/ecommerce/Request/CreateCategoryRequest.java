package com.learn.ecommerce.Request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class CreateCategoryRequest {
                @NotEmpty
                private String name;
                @NotEmpty
                private String description;
              
}
