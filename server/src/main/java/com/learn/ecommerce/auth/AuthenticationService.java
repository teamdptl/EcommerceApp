package com.learn.ecommerce.auth;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.learn.ecommerce.config.JwtService;
import com.learn.ecommerce.token.Token;
import com.learn.ecommerce.token.TokenRepository;
import com.learn.ecommerce.token.TokenType;
import com.learn.ecommerce.user.Role;
import com.learn.ecommerce.user.User;
import com.learn.ecommerce.user.UserRepository;
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
import java.util.NoSuchElementException;

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
              .message("Success : Đăng ký thành công")
              .accessToken(jwtToken)
              .refreshToken(refreshToken)
              .build());
    }
    return ResponseEntity.badRequest().body(
             AuthenticationResponse.builder()
            .message("Error : Email đã tồn tại")
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
              .orElseThrow() ;
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

  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String refreshToken;
    final String userEmail;
    if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
      return;
    }
    refreshToken = authHeader.substring(7);
    userEmail = jwtService.extractUsername(refreshToken);
    if (userEmail != null) {
      var user = this.repository.findByEmail(userEmail)
              .orElseThrow();
      if (jwtService.isTokenValid(refreshToken, user)) {
        var accessToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);
        var authResponse = AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
      }
    }
  }
}
