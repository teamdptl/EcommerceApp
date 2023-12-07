package com.learn.ecommerce.Controller;

import com.learn.ecommerce.Request.ChangePasswordRequest;
import com.learn.ecommerce.Request.RegisterRequest;
import com.learn.ecommerce.Service.ChangePasswordService;
import com.learn.ecommerce.Service.LogoutService;
import com.learn.ecommerce.Request.AuthenticationRequest;
import com.learn.ecommerce.Response.AuthenticationResponse;
import com.learn.ecommerce.Service.Implementation.AuthenticationService;
import com.learn.ecommerce.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
  @Autowired
  ChangePasswordService changePasswordService;
  
  private final UserService userService;

  private final AuthenticationService service;

  private final LogoutService logoutService;

  @PostMapping("/register")
  public ResponseEntity<?> register(
      @Valid @RequestBody RegisterRequest request, BindingResult result
  ) {
    if (result.hasErrors()){
      return ResponseEntity.badRequest().body(
              AuthenticationResponse.builder()
                      .message("Dữ liệu "+result.getFieldError().getField()+ " không hợp lệ!")
                      .build());
    }
    return service.register(request);
  }
  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request
  ) {
    return service.authenticate(request);
  }
  @PostMapping("/logout")
  public void logout(
          HttpServletRequest request,
          HttpServletResponse response,
          Authentication authentication
          ){
    logoutService.logout(request, response, authentication);
  }

  @PostMapping("/refresh-token")
  public ResponseEntity<AuthenticationResponse> getNewAccessToken(@RequestParam String refreshToken){
    return service.refreshToken(refreshToken);
  }
  @GetMapping("/confirm-password")
  public Boolean checkExpritation(@RequestParam String UUID) {
    return changePasswordService.checkExpiration(UUID);
  }
  @PostMapping("/confirm-password")
  public ResponseEntity<?> changePassword(
          @RequestBody ChangePasswordRequest request
  ) throws UnsupportedEncodingException {
    return userService.changePassword(request);
  }
  @PostMapping("/forget-password")
  public ResponseEntity<Map<String, String>> forgotPassword(
          @RequestBody String email
  ) throws NoSuchAlgorithmException {
    System.out.println(email);
    return userService.forgotPassword(email);
  }

}
