package com.learn.ecommerce.Controller;
import com.learn.ecommerce.Entity.Token;
import com.learn.ecommerce.Repository.TokenRepository;
import org.apache.commons.beanutils.BeanUtils;

import com.learn.ecommerce.DTO.UserDTO;
import com.learn.ecommerce.Entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.InvocationTargetException;
import java.util.Optional;

@RequestMapping("/api/token")
@RestController
public class TokenController {
    final
    TokenRepository tokenRepository;

    public TokenController(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @GetMapping("/user")
    public ResponseEntity<UserDTO> getUserByToken(@RequestParam String token) throws InvocationTargetException, IllegalAccessException {
//        String jwt = token.substring(7);
       Optional<Token> tokenAccess = tokenRepository.findByToken(token);
        Boolean isTokenValid = false;
     if(!tokenAccess.isEmpty()){
          isTokenValid = tokenAccess
                 .map(t -> !t.isExpired() && !t.isRevoked())
                 .orElse(false);
     }
        if(isTokenValid){
            User user = tokenAccess.get().getUser();
            UserDTO userDTO =  new UserDTO();
            BeanUtils.copyProperties(userDTO,user);
            return ResponseEntity.ok().body(userDTO);
        }
        System.out.println("user");
        return ResponseEntity.badRequest().body(null);
    }
}
