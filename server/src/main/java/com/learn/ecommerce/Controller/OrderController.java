package com.learn.ecommerce.Controller;

import com.learn.ecommerce.Entity.Order;
import com.learn.ecommerce.Entity.Product;
import com.learn.ecommerce.Entity.ShipInfo;
import com.learn.ecommerce.Entity.User;
import com.learn.ecommerce.Request.PlaceOrderItem;
import com.learn.ecommerce.Request.PlaceOrderRequest;
import com.learn.ecommerce.Response.ErrorResponse;
import com.learn.ecommerce.Response.SuccessResponse;
import com.learn.ecommerce.Service.Implementation.OrderImp;
import com.learn.ecommerce.Service.Implementation.ShipInfoImp;
import com.learn.ecommerce.Ultis.AuthUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/order")
public class OrderController {
    @Autowired
    private ShipInfoImp shipInfoImp;
    @Autowired
    private OrderImp orderImp;
    @Autowired
    private AuthUtils auth;

    // ROLE: User
    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@Valid @RequestBody PlaceOrderRequest request, BindingResult result){
        if (result.hasErrors()){
            return ResponseEntity.badRequest().body(new ErrorResponse("Dữ liệu " + result.getFieldError().getField() + " không hợp lệ!"));
        }
        Optional<ShipInfo> shipInfo = shipInfoImp.findShipInfoById(request.getShipId());
        if (shipInfo.isEmpty())
            return ResponseEntity.badRequest().body(new ErrorResponse("Thông tin nhận hàng không tồn tại!"));

        Optional<User> optionalUser = auth.getCurrentUser();
        Order order = new Order();
        order.setPaymentMethod(request.getPaymentType());
        order.setCreateAt(new Timestamp(System.currentTimeMillis()));
        order.setShipInfo(shipInfo.get());
        order.setUser(optionalUser.orElse(null));
        String coupon = "";
        try {
            Order saved = orderImp.placeOrder(Arrays.asList(request.getItems()), order, coupon);
            return ResponseEntity.ok(new SuccessResponse("Tạo đơn hàng thành công"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    // ROLE: User
    @GetMapping("/user-orders")
    public ResponseEntity<?> getUserOrders(){
        return ResponseEntity.ok("ok");
    }

    // ROLE: Admin
//    @GetMapping("/all")
//    public ResponseEntity<?> getAllOrders(){
//
//    }


}
