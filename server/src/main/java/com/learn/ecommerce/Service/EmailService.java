package com.learn.ecommerce.Service;

import com.learn.ecommerce.Entity.ChangePassword;
import com.learn.ecommerce.Entity.User;
import com.learn.ecommerce.Repository.ChangePasswordRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

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

    public void sendEmailWithAttachment(String to, String suject, String body, String attachment) throws MessagingException {
        System.out.println("Vô email");
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setSubject(suject);
        helper.setText(body);
        helper.setTo(to);
        System.out.println("Vô lấy file trong lap");
        FileSystemResource resource = new FileSystemResource(new File(attachment));
        helper.addAttachment(resource.getFilename(), resource);
        System.out.println("Lấy thành công");
        emailSender.send(message);
        System.out.println("Mail Send With Attachment successfully");


    }


//    @Async
//    public void sendEmailAsync(String to, String subject, String body, String attachment) throws MessagingException {
//        sendEmailWithAttachment(to, subject, body, attachment);
//        CompletableFuture.completedFuture(null);
//    }


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