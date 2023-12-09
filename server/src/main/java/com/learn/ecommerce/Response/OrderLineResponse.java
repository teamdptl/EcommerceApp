package com.learn.ecommerce.Response;

import com.learn.ecommerce.Entity.Order;
import com.learn.ecommerce.Entity.OrderLine;
import com.learn.ecommerce.Entity.Product;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class OrderLineResponse {

    private long price;
    private int quantity;
    private String productName;
    private String productPrice;
    private MediaResponse productMedia;

}
