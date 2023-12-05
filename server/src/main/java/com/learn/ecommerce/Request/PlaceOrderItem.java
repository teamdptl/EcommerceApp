package com.learn.ecommerce.Request;

import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class PlaceOrderItem {
    @Min(1)
    private int buyQuantity;
    @Min(1)
    private int productId;
}
