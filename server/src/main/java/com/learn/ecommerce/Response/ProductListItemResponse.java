package com.learn.ecommerce.Response;

import lombok.Data;

@Data
public class ProductListItemResponse {
    private int productId;
    private String name;
    private long price;
    private long oldPrice;
    private String slugUrl;
    private double rating;
    private int warrantyMonths;
    private int quantity;
    private String brandName;
    private String categoryName;
}
