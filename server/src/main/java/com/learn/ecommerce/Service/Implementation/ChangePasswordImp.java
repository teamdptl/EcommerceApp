package com.learn.ecommerce.Service.Implementation;

import com.learn.ecommerce.Entity.ChangePassword;
import com.learn.ecommerce.Repository.ChangePasswordRepository;
import com.learn.ecommerce.Service.ChangePasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Optional;


@Component
public class ChangePasswordImp implements ChangePasswordService {
    @Autowired
    private ChangePasswordRepository changePasswordRepository;

    @Override
    public Boolean checkExpiration(String UUID) {
        try{
            ChangePassword changePassword = changePasswordRepository.findById(UUID).orElseThrow();
            long expiration  = changePassword.getExpiration().getTime();
            long currentDate = new Date().getTime();
            if(expiration > currentDate){
                return true;
            }
        }
       catch (Exception e){
           return false;
       }

        return false;
    }



}
