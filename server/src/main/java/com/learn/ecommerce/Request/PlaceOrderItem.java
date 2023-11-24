package com.learn.ecommerce.Request;

import lombok.Data;

@Data
public class PlaceOrderItem {
    private int quantity;
    private int productId;
}
