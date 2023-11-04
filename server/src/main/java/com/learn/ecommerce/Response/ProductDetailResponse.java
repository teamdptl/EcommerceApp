package com.learn.ecommerce.Response;

import lombok.Data;

@Data
public class ProductDetailResponse {
    private int productId;
    private String name;
    private String description;
    private String thongSoKiThuat;
    private long price;
    private long oldPrice;
    private int warrantyMonths;
    private int quantity;
    private String origin;
    private String slugUrl;
    private double rating = 0.0;
    private String brandName;
    private String brandImage;
    private String categoryName;
    private boolean isFavorite = false;
}
