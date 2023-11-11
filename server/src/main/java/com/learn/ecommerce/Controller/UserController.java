package com.learn.ecommerce.Controller;

import com.learn.ecommerce.user.ChangePasswordRequest;
import com.learn.ecommerce.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import com.learn.ecommerce.Request.UpdateUserRequest;
import com.learn.ecommerce.user.Role;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
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
        return service.changePassword(request);
    }

    @PostMapping("/forget-password")
    public ResponseEntity<Map<String, String>> forgotPassword(
            @RequestBody String email
    ) {
        System.out.println(email);
        return service.forgotPassword(email);
    }

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
    @PutMapping("/update}")
    public ResponseEntity<?> updateUsers(@RequestBody @Valid UpdateUserRequest request, BindingResult result) {
        return null;
    }
}