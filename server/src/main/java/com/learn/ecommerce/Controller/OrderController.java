package com.learn.ecommerce.Controller;

import com.learn.ecommerce.Request.PlaceOrderRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/order")
public class OrderController {

    // ROLE: User
    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody PlaceOrderRequest request){
        return ResponseEntity.ok(request);
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
