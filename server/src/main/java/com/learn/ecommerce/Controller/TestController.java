package com.learn.ecommerce.Controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
public class TestController {
    @GetMapping
    public ResponseEntity<?> getCurrentUser(){
        UserDetails details = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println("Username: "+details.getUsername());
        return ResponseEntity.ok(SecurityContextHolder.getContext().getAuthentication().getName());
    }
}
