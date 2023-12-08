package com.learn.ecommerce.Controller;
import com.learn.ecommerce.Entity.Token;
import com.learn.ecommerce.Repository.TokenRepository;
import com.learn.ecommerce.Response.ErrorResponse;
import com.learn.ecommerce.Ultis.AuthUtils;
import com.learn.ecommerce.Ultis.ModelMapperUtils;

import com.learn.ecommerce.DTO.UserDTO;
import com.learn.ecommerce.Entity.User;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping("/api/v1/token")
@RestController
public class TokenController {
    private final TokenRepository tokenRepository;
    private final AuthUtils authUtils;

    public TokenController(TokenRepository tokenRepository, AuthUtils authUtils) {
        this.tokenRepository = tokenRepository;
        this.authUtils = authUtils;
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserByToken(@RequestHeader(HttpHeaders.AUTHORIZATION) String header) {
        String token = header.replace("Bearer ", "");
        Optional<Token> tokenAccess = tokenRepository.findByToken(token);
        if (tokenAccess.isEmpty()){
            return ResponseEntity.badRequest().body(new ErrorResponse("Token không hợp lệ"));
        }

        Token acessToken = tokenAccess.get();
        if (acessToken.isExpired() || acessToken.isRevoked()){
            return ResponseEntity.badRequest().body(new ErrorResponse("Token đã hết hạn hoặc bị thu hồi"));
        }

        Optional<User> userWrapper = authUtils.getCurrentUser();
        if (userWrapper.isEmpty())
            return ResponseEntity.badRequest().body(new ErrorResponse("User không tồn tại"));

        return ResponseEntity.ok(ModelMapperUtils.map(userWrapper.get(), UserDTO.class));
    }
}
