package com.learn.ecommerce.Service;

import com.learn.ecommerce.Entity.ChangePassword;
import com.learn.ecommerce.Entity.User;
import com.learn.ecommerce.Repository.ChangePasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

@Service
public class EmailService {

    @Value("864000")
    private int expTime;
    private String host = "http://localhost:3000";
    @Autowired
    private JavaMailSender emailSender;
    @Autowired
    private ChangePasswordRepository changePasswordRepository;

    public void sendSimpleEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }

    public String generateLinkChangePassword(User user) throws NoSuchAlgorithmException {
        UUID uuid = UUID.randomUUID();
        String randomUUIDString = uuid.toString();

        Date expiration = new Date(System.currentTimeMillis() + expTime);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");


        ChangePassword changePassword = new ChangePassword();
        changePassword.setUUID(randomUUIDString);
        changePassword.setExpiration(expiration);

        changePassword.setUser(user);
        changePasswordRepository.save(changePassword);

        String link = host + "/confirm-password?code=" + uuid;
        return link;
    }
}