package com.learn.ecommerce.user;

import com.learn.ecommerce.Ultis.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.HttpClientErrorException;

import java.io.UnsupportedEncodingException;
import java.security.Principal;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private UserRepository userRepository;
    public ResponseEntity<Map<String,String>> changePassword(ChangePasswordRequest request) throws UnsupportedEncodingException {

        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }
        byte[] decode = Base64.getDecoder().decode(request.getCode());
        String email = new String(decode, "UTF-8");
        try{
            User user = userRepository.findByEmail(email).orElseThrow();
            System.out.println(user.getEmail());
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            Map<String,String> response = new HashMap<>();
            response.put("message","Thay đổi password thành công");
            repository.save(user);
            return ResponseEntity.ok().body(response);
        }
        catch(Exception e){
            Map<String,String> response = new HashMap<>();
            response.put("message","Code không đúng");
            return ResponseEntity.badRequest().body(response);
        }
    }
    public ResponseEntity<Map<String,String>> forgotPassword(String email){
        String link = emailService.generateLinkChangePassword(email);
        try{
            repository.findByEmail(email).orElseThrow();
        }
        catch (NoSuchElementException e)
        {
            Map<String,String> reponse = new HashMap<>();
            reponse.put("message","Email chưa được đăng ký");
           return ResponseEntity.badRequest().body(reponse);
        }
        Map<String,String> reponse = new HashMap<>();
        reponse.put("message","Email đã được gửi");
        var subject = "Thay đổi mật khẩu";
        var text = "Nhấn vào link sau để được liên kết đến nơi thay đổi password  "+link;
        emailService.sendSimpleEmail(email,subject,text);
        return ResponseEntity.ok().body(reponse);

    }
}
