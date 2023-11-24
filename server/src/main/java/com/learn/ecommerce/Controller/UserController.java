package com.learn.ecommerce.Controller;

import com.learn.ecommerce.Entity.Role;
import com.learn.ecommerce.Request.ChangePasswordRequest;
import com.learn.ecommerce.Request.UpdateUserRequest;
import com.learn.ecommerce.Service.ChangePasswordService;
import com.learn.ecommerce.Service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {


    // ROLE: Admin
    @GetMapping("/search")
    public ResponseEntity<?> getUsers(
            @RequestParam(required = false, defaultValue = "") String username,
            @RequestParam(required = false, defaultValue = "") String userId,
            @RequestParam(required = false, defaultValue = "USER") Role userRole,
            @RequestParam(required = false, defaultValue = "false") boolean isBlocked) {
        // Trả về all user theo query
        return null;
    }

    // ROLE: Admin
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable String userId) {
        return null;
    }

    // ROLE: Admin và chính bản thân user

    @PutMapping("/update")
    public ResponseEntity<?> updateUsers(@RequestBody @Valid UpdateUserRequest request, BindingResult result) {
        return null;

    }

}

