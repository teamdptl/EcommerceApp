package com.learn.ecommerce.Response;
import java.util.List;
import lombok.Data;

@Data
public class ProductDetailResponse {
    private int productId;
    private String name;
    private String description;
    private String thongSoKiThuat;
    private String attributes;
    private long price;
    private long oldPrice;
    private int warrantyMonths;
    private int quantity;
    private String origin;
    private String slugUrl;
    private double rating = 0.0;
    private String brandName;
    private String categoryName;
    private int categoryId;
    private int brandId;
    private boolean isFavorite = false;
    private List<MediaResponse> medias;
}
