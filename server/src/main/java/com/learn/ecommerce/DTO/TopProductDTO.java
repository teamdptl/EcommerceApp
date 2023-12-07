package com.learn.ecommerce.DTO;


import lombok.Data;

@Data
public class TopProductDTO {

    private int productId;
    private String name;
    private int totalSales;
    private String imageUrl;
    private Long price;

}
