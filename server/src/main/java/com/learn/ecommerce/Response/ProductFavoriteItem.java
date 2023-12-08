package com.learn.ecommerce.Response;

import lombok.Data;

@Data
public class ProductFavoriteItem {
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
}
