package com.learn.ecommerce.Controller;

import com.learn.ecommerce.Request.UpdateUserRequest;
import com.learn.ecommerce.user.Role;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

//@RestController
//@RequestMapping("/api/v1/user")
public class UserController {

    // ROLE: Admin
    @GetMapping("/search")
    public ResponseEntity<?> getUsers(
            @RequestParam(required = false, defaultValue = "") String username,
            @RequestParam(required = false, defaultValue = "") String userId,
            @RequestParam(required = false, defaultValue = "USER") Role userRole,
            @RequestParam(required = false, defaultValue = "false") boolean isBlocked){
        // Trả về all user theo query
        return null;
    }

    // ROLE: Admin
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable String userId){
        return null;
    }

    // ROLE: Admin và chính bản thân user
    @PutMapping("/update}")
    public ResponseEntity<?> updateUsers(@RequestBody @Valid UpdateUserRequest request, BindingResult result){
        return null;
    }

}
