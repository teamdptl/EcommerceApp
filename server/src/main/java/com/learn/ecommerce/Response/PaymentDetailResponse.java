package com.learn.ecommerce.Response;

import com.learn.ecommerce.Entity.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDetailResponse {
    private String paymentQr;
    private Long expiredAt;
    private Integer orderId;
    private String code;
    private boolean needPay = false;
    private String message;
}
