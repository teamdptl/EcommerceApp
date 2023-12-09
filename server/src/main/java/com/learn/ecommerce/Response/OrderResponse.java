package com.learn.ecommerce.Response;

import java.sql.Timestamp;
import java.util.List;

import lombok.Data;

@Data
public class OrderResponse {
    private int orderId;
    private int orderStatus = 0;
    private boolean paymentStatus = false;
    private String paymentMethod;
    private long totalPrice = 0;
    private Timestamp createAt;
    private String userFullname;
    private String shipInfoFullname;
    private String shipInfoPhone;
    private String shipInfoAddress;
    private boolean isDeleted = false;
    private List<OrderLineResponse> orderLineResponse;
}
