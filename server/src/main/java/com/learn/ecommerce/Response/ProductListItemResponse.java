package com.learn.ecommerce.Response;

import lombok.Data;

@Data
public class ProductListItemResponse {
    private int productId;
    private String name;
    private long price;
    private long oldPrice;
    private String slugUrl;
    private int warrantyMonths;
    private int quantity;
    private String brandName;
    private String categoryName;
    private String imageUrl;
    private Long orderCount = 0L;
    private double rating = 0;
    private int reviewCount = 0;
}
