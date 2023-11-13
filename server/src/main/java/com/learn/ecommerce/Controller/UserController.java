package com.learn.ecommerce.Controller;

import com.learn.ecommerce.Service.ChangePasswordService;
import com.learn.ecommerce.Request.ChangePasswordRequest;
import com.learn.ecommerce.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    ChangePasswordService changePasswordService;
    private final UserService service;

    @GetMapping("/confirm-password")
    public Boolean checkExpritation(@RequestParam String UUID){

        return changePasswordService.checkExpiration(UUID);
    };

    @PostMapping("/confirm-password")
    public ResponseEntity<?> changePassword(
          @RequestBody ChangePasswordRequest request
    ) throws UnsupportedEncodingException {
        return  service.changePassword(request);
    }
    @PostMapping("/forget-password")
    public ResponseEntity<Map<String,String>> forgotPassword(
            @RequestBody String email
    ) throws NoSuchAlgorithmException {
        System.out.println(email);
        return  service.forgotPassword(email);
    }

}
