package com.learn.ecommerce.Controller;

import com.learn.ecommerce.Entity.PaymentStatus;
import com.learn.ecommerce.Request.SocketPaymentRequest;
import com.learn.ecommerce.Response.PaymentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import com.learn.ecommerce.Service.Implementation.PaymentStatusService;

@Controller
public class PaymentSocketController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private PaymentStatusService service;

    @MessageMapping("/payment")
    public void greeting(@Payload SocketPaymentRequest request) {
        String code = request.getCode();
        PaymentStatus p = service.findPaymentByCode(code);
        if (p == null){
            PaymentResponse err = new PaymentResponse(false, "Không tìm thấy mã thanh toán", 0, true);
            messagingTemplate.convertAndSend("/queue/payment/"+code, err);
            return;
        }
        if (p.getTimeReceived() > 0){
            PaymentResponse err = new PaymentResponse(true, "Đơn hàng đã được thanh toán", p.getOrder().getOrderId(), true);
            messagingTemplate.convertAndSend("/queue/payment/"+code, err);
            return;
        }
        PaymentResponse data = service.checkPayment(p);
        messagingTemplate.convertAndSend("/queue/payment/"+code, data);
    }
}
