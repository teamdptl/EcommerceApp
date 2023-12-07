package com.learn.ecommerce.DTO;


import lombok.Data;

@Data
public class TopUserDTO {

    private int userId;
    private String name;
    private Long totalBuy;
}
