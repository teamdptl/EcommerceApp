package com.learn.ecommerce.Request;

import com.learn.ecommerce.Entity.ShipInfo;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class PlaceOrderRequest {
    private PlaceOrderItem[] items;
    @NotEmpty
    private String paymentType;
    @Min(0)
    private Integer shipId;
    // TODO: nên kiểm tra xem thằng user đó có quyền truy cập shipInfo không
}
