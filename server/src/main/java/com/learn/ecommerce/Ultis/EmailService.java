package com.learn.ecommerce.Ultis;

import com.learn.ecommerce.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;

@Service
public class EmailService {
    @Value("86400")
    private int expTime;
    @Value("${host}")
    private String host ;
    @Autowired
    private JavaMailSender emailSender;

    public void sendSimpleEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }
    public String generateLinkChangePassword(String email)
    {
        Date date =  new Date(System.currentTimeMillis() + expTime);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = dateFormat.format(date);
        byte[] dateEncoded = Base64.getEncoder().encode(dateString.getBytes());
        System.out.println("Original Date: " + date);
        System.out.println("Base64 Encoded: " + new String(dateEncoded));
        String decode = host+"/confirm-password?code=" + Base64.getEncoder().encodeToString(email.getBytes())+"&exp=" + new String(dateEncoded);
        return decode;
    }
}