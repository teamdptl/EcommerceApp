package com.learn.ecommerce.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user/shipInfo")
public class ShipInfoController {
    // Role: User
    @GetMapping("/get")
    public ResponseEntity<?> getAllShipInfo(){
        // Trả về tất cả địa chỉ giao hàng của user
        return null;
    }

    // Role: User
    @PostMapping("/add")
    public ResponseEntity<?> addShipInfo(){
        // Trả về tất cả địa chỉ giao hàng của user
        return null;
    }

    // Role: User
    @PutMapping("/update")
    public ResponseEntity<?> updateShipInfo(
            @RequestPart String fullName, @RequestPart String address,
            @RequestPart String phone, @RequestPart Integer shipId){
        return null;
    }

    // Role: User, người sở hữu shipInfo
    @DeleteMapping("/delete/{shipId}")
    public ResponseEntity<?> deleteShipInfo(@PathVariable String shipId){
        return null;
    }
}
