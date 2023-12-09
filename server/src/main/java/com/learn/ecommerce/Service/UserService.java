package com.learn.ecommerce.Service;

import com.learn.ecommerce.Entity.Role;
import com.learn.ecommerce.Entity.User;
import com.learn.ecommerce.Repository.ChangePasswordRepository;
import com.learn.ecommerce.Repository.UserRepository;
import com.learn.ecommerce.Request.ChangePasswordRequest;
import com.learn.ecommerce.Response.ErrorResponse;
import com.learn.ecommerce.Response.SuccessResponse;
import com.learn.ecommerce.Service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;
    @Autowired
    private ChangePasswordRepository changePasswordRepository;
    @Autowired
    private EmailService emailService;
//    @Autowired
//    private UserRepository userRepository;
    public ResponseEntity<Map<String,String>> changePassword(ChangePasswordRequest request) throws UnsupportedEncodingException {

        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }
//        if(request.getNewPassword().length() < 6){
//
//        }
        String email = changePasswordRepository.findByUUID(request.getCode()).get().getUser().getEmail();
        System.out.println(email);

        try{
            User user = repository.findByEmail(email).orElseThrow();
            System.out.println(user.getEmail());
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            Map<String,String> response = new HashMap<>();
            response.put("message","Thay đổi password thành công  ");
            repository.save(user);
            return ResponseEntity.ok().body(response);
        }
        catch(Exception e){
            Map<String,String> response = new HashMap<>();
            response.put("message","Code không đúng");
            return ResponseEntity.badRequest().body(response);
        }
    }
    public ResponseEntity<Map<String,String>> forgotPassword(String email) throws NoSuchAlgorithmException {

        try{
            User user = repository.findByEmail(email).orElseThrow();
            String link = emailService.generateLinkChangePassword(user);
            Map<String,String> reponse = new HashMap<>();
            reponse.put("message","Email đã được gửi");
            var subject = "Thay đổi mật khẩu";
            var text = "Nhấn vào link sau để được liên kết đến nơi thay đổi password  "+link;
            emailService.sendSimpleEmail(email,subject,text);
            return ResponseEntity.ok().body(reponse);
        }
        catch (NoSuchElementException e)
        {
            Map<String,String> reponse = new HashMap<>();
            reponse.put("message","Email chưa được đăng ký");
           return ResponseEntity.badRequest().body(reponse);
        }



    }

    public ResponseEntity<?> setUserNewPassword(User user, String oldPass, String newPassword){
        if (passwordEncoder.matches(oldPass, user.getPassword())){
            user.setPassword(passwordEncoder.encode(newPassword));
            repository.save(user);
            return ResponseEntity.ok(new SuccessResponse("Thay đổi mật khẩu thành công!"));
        }
        return ResponseEntity.ok(new ErrorResponse("Mật khẩu không đúng!"));
    }

    public Page<User> findByAllUser(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public User createUser(User user) {
        return  repository.save(user);
    }

    public boolean existsByEmail(String email) {
        return repository.findByEmail(email).isPresent();
    }

    public Optional<User> findById(Integer id) {
        return repository.findById(id);
    }

    public User updateUser(User user) {
        return repository.save(user);
    }

    public Page<User> findUsersByCriteria(String keyword, Role userRole, String isDeleted, Pageable pageable) {
        Specification<User> specification = Specification.where(null);
        if (userRole != null) {
            specification = specification.and(userRoleEq(userRole));
        }

        if ("true".equalsIgnoreCase(isDeleted) || "false".equalsIgnoreCase(isDeleted)) {
            specification = specification.and(isDeletedEq(Boolean.parseBoolean(isDeleted)));
        }



        if (!keyword.isEmpty()) {
            specification = specification.and(fullnameOrEmailLike(keyword));
        }



        return repository.findAll(specification, pageable);
    }

    private static Specification<User> fullnameOrEmailLike(String keyword) {
        return (root, query, builder) ->
                builder.or(
                        builder.like(root.get("fullname"), "%" + keyword + "%"),
                        builder.like(root.get("email"), "%" + keyword + "%")
                );
    }

    private Specification<User> userRoleEq(Role userRole) {
        return (root, query, builder) -> {
            return builder.equal(root.get("role"), userRole);
        };
    }

    private Specification<User> isDeletedEq(boolean isDeleted) {
        return (root, query, builder) -> {
            return builder.equal(root.get("isDeleted"), isDeleted);
        };
    }
}


