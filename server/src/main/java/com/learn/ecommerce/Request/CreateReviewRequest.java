package com.learn.ecommerce.Request;

import lombok.Data;

@Data
public class CreateReviewRequest {
    String description;
    Integer rate;
}
