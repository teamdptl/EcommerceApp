package com.learn.ecommerce.Controller;

import com.learn.ecommerce.Entity.Role;
import com.learn.ecommerce.Entity.ShipInfo;
import com.learn.ecommerce.Entity.User;
import com.learn.ecommerce.Request.*;
import com.learn.ecommerce.Response.CreateUserResponse;
import com.learn.ecommerce.Response.ErrorResponse;
import com.learn.ecommerce.Response.PageResponse;
import com.learn.ecommerce.Response.ShipInfoListResponse;
import com.learn.ecommerce.Service.ChangePasswordService;
import com.learn.ecommerce.Service.UserService;
import com.learn.ecommerce.Ultis.AuthUtils;
import com.learn.ecommerce.Ultis.ModelMapperUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;
    private final PasswordEncoder passwordEncoder;
    private final AuthUtils authUtils;


    // ROLE: Admin
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/search")
    public ResponseEntity<?> getUsers(
            @RequestParam(defaultValue = "", required = false) String keyword,
            @RequestParam(defaultValue = "", required = false) Role userRole,
            @RequestParam(defaultValue = "", required = false) String isDeleted,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "5", required = false) int size) {
        // Trả về all user theo query

        Pageable pageable = PageRequest.of(page, size);
        Page<User> userList = service.findUsersByCriteria(keyword, userRole, isDeleted, pageable);
        List<CreateUserResponse> response = ModelMapperUtils.mapAll(userList.getContent(), CreateUserResponse.class);
        return new ResponseEntity<>(new PageResponse<>(response, userList.getTotalPages(), userList.getTotalElements(), page, size), HttpStatus.OK);
    }

    // ROLE: Admin
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<?> addUser(@Valid @RequestBody CreateUserRequest createUserRequest, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>("Dữ liệu không hợp lệ", HttpStatus.BAD_REQUEST);
        }

        if (service.existsByEmail(createUserRequest.getEmail())) {
            return new ResponseEntity<>("Email đã được tạo", HttpStatus.BAD_REQUEST);
        }else{
            User user = User.builder()
                    .email(createUserRequest.getEmail())
                    .password(passwordEncoder.encode(createUserRequest.getPassword()))
                    .fullname(createUserRequest.getFullname())
                    .isDeleted(createUserRequest.isDeleted())
                    .role(Role.valueOf(createUserRequest.getRole().toString().toUpperCase()))
                    .build();

//            User user = ModelMapperUtils.map(createUserRequest, User.class);

            User savedUser =   service.createUser(user);

            CreateUserResponse response = ModelMapperUtils.map(savedUser, CreateUserResponse.class);

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    // ROLE: Admin
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get")
    public ResponseEntity<?> getAllUser(@RequestParam(name = "page", defaultValue = "0") int page,
                                        @RequestParam(name = "size", defaultValue = "5") int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<User> userList = service.findByAllUser(pageable);
        List<CreateUserResponse> response = ModelMapperUtils.mapAll(userList.getContent(), CreateUserResponse.class);
        return new ResponseEntity<>(new PageResponse<>(response, userList.getTotalPages(), userList.getTotalElements(), page, size), HttpStatus.OK);
    }

    // ROLE: Admin và User
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable int userId){
        Optional<User> optionalUser = service.findById(userId);
        if (!optionalUser.isPresent()) {
            return new ResponseEntity<>("Người dùng không tồn tại", HttpStatus.NOT_FOUND);
        }
        else{
            User user = optionalUser.get();
            CreateUserResponse response = ModelMapperUtils.map(user, CreateUserResponse.class);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }


    // ROLE: Admin
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable String userId) {

        return null;
    }

    // ROLE: Admin và chính bản thân user

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUsers(@PathVariable int id, @RequestBody @Valid CreateUserEditRequest request, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>("Dữ liệu không hợp lệ", HttpStatus.BAD_REQUEST);
        }
        // Kiểm tra xem người dùng có tồn tại không
        Optional<User> optionalUser = service.findById(id);
        if (!optionalUser.isPresent()) {
            return new ResponseEntity<>("Người dùng không tồn tại", HttpStatus.NOT_FOUND);
        }
        User existingUser = optionalUser.get();

        // Kiểm tra xem email mới có tồn tại trong hệ thống không (không tính người dùng hiện tại)
        if (!existingUser.getEmail().equalsIgnoreCase(request.getEmail()) && service.existsByEmail(request.getEmail())) {
            return new ResponseEntity<>("Email đã tồn tại trong hệ thống", HttpStatus.BAD_REQUEST);
        }
            // Cập nhật thông tin người dùng
            existingUser.setEmail(request.getEmail());
            existingUser.setFullname(request.getFullname());

            existingUser.setRole(Role.valueOf(request.getRole().toUpperCase()));
        existingUser.setDeleted(request.getIsDeleted());


        // Lưu thay đổi vào cơ sở dữ liệu
            User updatedUser = service.updateUser(existingUser);

            CreateUserResponse response = ModelMapperUtils.map(updatedUser, CreateUserResponse.class);


            return new ResponseEntity<>(response, HttpStatus.OK);
        }


    @PostMapping("/new-password")
    public ResponseEntity<?> setNewPassword(@RequestBody NewPasswordRequest request){
        if (request.getNewPassword().length() < 6)
            return ResponseEntity.ok(new ErrorResponse("Mật khẩu mới ít hơn 6 kí tự"));
        Optional<User> user = authUtils.getCurrentUser();
        if (user.isEmpty())
            ResponseEntity.ok(new ErrorResponse("Không tìm thấy user"));
        return service.setUserNewPassword(user.get(), request.getOldPassword(), request.getNewPassword());
    }

}

