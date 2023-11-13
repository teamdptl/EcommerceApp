package com.learn.ecommerce.Service;


import org.springframework.stereotype.Service;

@Service
public interface ChangePasswordService {
    Boolean checkExpiration(String UUID);
}
