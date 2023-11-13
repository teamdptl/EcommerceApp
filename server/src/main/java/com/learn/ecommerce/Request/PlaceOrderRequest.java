package com.learn.ecommerce.Request;

import com.learn.ecommerce.Entity.ShipInfo;
import lombok.Data;

@Data
public class PlaceOrderRequest {
    private PlaceOrderItem[] items;
    private String paymentType;
    private CreateShipInfoRequest shipInfo;
}
