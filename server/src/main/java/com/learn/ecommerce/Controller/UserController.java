package com.learn.ecommerce.Controller;

import com.learn.ecommerce.user.ChangePasswordRequest;
import com.learn.ecommerce.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PostMapping("/confirm-password")
    public ResponseEntity<?> changePassword(
          @RequestBody ChangePasswordRequest request
    ) throws UnsupportedEncodingException {
        return  service.changePassword(request);
    }
    @PostMapping("/forget-password")
    public ResponseEntity<Map<String,String>> forgotPassword(
            @RequestBody String email
    ){
        System.out.println(email);
        return  service.forgotPassword(email);
    }
}
