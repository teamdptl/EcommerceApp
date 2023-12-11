package com.learn.ecommerce.Service.Implementation;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.learn.ecommerce.Request.AuthenticationRequest;
import com.learn.ecommerce.Request.RegisterRequest;
import com.learn.ecommerce.Response.AuthenticationResponse;
import com.learn.ecommerce.Service.JwtService;
import com.learn.ecommerce.Entity.Token;
import com.learn.ecommerce.Repository.TokenRepository;
import com.learn.ecommerce.Entity.TokenType;
import com.learn.ecommerce.Entity.Role;
import com.learn.ecommerce.Entity.User;
import com.learn.ecommerce.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public ResponseEntity<AuthenticationResponse> register(RegisterRequest request) {
    var user = User.builder()
            .fullname(request.getFullname())
        .email(request.getEmail())
            .username(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(Role.USER)
        .build();
    var isUserExisted = repository.findByEmail(request.getEmail());
    if (isUserExisted.isEmpty()){
      var savedUser = repository.save(user);
      var jwtToken = jwtService.generateToken(user);
      var refreshToken = jwtService.generateRefreshToken(user);
      saveUserToken(savedUser, jwtToken);
      return ResponseEntity.ok(AuthenticationResponse.builder()
              .message("Đăng ký thành công")
              .accessToken(jwtToken)
              .refreshToken(refreshToken)
              .build());
    }
    return ResponseEntity.badRequest().body(
             AuthenticationResponse.builder()
            .message("Email đã tồn tại")
            .accessToken(null)
            .refreshToken(null)
            .build());
  }

  public ResponseEntity<AuthenticationResponse> authenticate(AuthenticationRequest request) {
    try { authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()
        )
    );
      var user = repository.findByEmail(request.getEmail())
              .orElseThrow();
      var jwtToken = jwtService.generateToken(user);
      var refreshToken = jwtService.generateRefreshToken(user);
      revokeAllUserTokens(user);
      saveUserToken(user, jwtToken);
      return ResponseEntity.ok(
               AuthenticationResponse.builder()
                       .message("Đăng nhập thành công")
              .accessToken(jwtToken)
              .refreshToken(refreshToken)
              .build());
    }
    catch (Exception e){
      return ResponseEntity.badRequest().body(
              AuthenticationResponse.builder()
              .message("Tài khoản hoặc mật khẩu không đúng")
                      .accessToken(null)
                      .refreshToken(null)
              .build());
    }


  }

  private void saveUserToken(User user, String jwtToken) {
    var token = Token.builder()
        .user(user)
        .token(jwtToken)
        .tokenType(TokenType.BEARER)
        .expired(false)
        .revoked(false)
        .build();
    tokenRepository.save(token);
  }

  private void revokeAllUserTokens(User user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }

  public ResponseEntity<AuthenticationResponse> refreshToken(String refreshToken) {
    String userEmail = jwtService.extractUsername(refreshToken);
    if (userEmail != null) {
      var user = this.repository.findByEmail(userEmail);
      if (user.isEmpty()) return ResponseEntity.badRequest().build();
      if (jwtService.isTokenValid(refreshToken, user.get())) {
        var accessToken = jwtService.generateToken(user.get());
        revokeAllUserTokens(user.get());
        saveUserToken(user.get(), accessToken);
        var authResponse = AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        return ResponseEntity.ok(authResponse);
      }
    }
    return ResponseEntity.badRequest().build();
  }
}
