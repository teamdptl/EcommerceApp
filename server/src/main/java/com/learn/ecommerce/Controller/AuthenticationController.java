package com.learn.ecommerce.Controller;

import com.learn.ecommerce.Request.RegisterRequest;
import com.learn.ecommerce.Service.LogoutService;
import com.learn.ecommerce.Request.AuthenticationRequest;
import com.learn.ecommerce.Response.AuthenticationResponse;
import com.learn.ecommerce.Response.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;

  private final LogoutService logoutService;

  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponse> register(
      @RequestBody RegisterRequest request
  ) {
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
  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response
  ) throws IOException {
    service.refreshToken(request, response);
  }


}
