package com.learn.ecommerce.Response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentResponse {
    private boolean isPayment;
    private String message;
    private int orderId;
    private boolean isStopWaiting;
}
