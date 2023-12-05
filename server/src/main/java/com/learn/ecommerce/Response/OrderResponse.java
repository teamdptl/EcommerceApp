package com.learn.ecommerce.Response;

import java.sql.Date;
import lombok.Data;

@Data
public class OrderResponse {
    private int orderId;
    private int orderStatus = 0;
    private boolean paymentStatus = false;
    private String paymentMethod;
    private long totalPrice = 0;
    private Date createAt;
    private String userFullname;
    private String shipInfoFullname;
    private boolean isDeleted = false;
}
