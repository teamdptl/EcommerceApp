package com.learn.ecommerce.Controller;

import com.learn.ecommerce.Entity.ShipInfo;
import com.learn.ecommerce.Request.CreateShipInfoRequest;
import com.learn.ecommerce.Request.EditShipInfoRequest;
import com.learn.ecommerce.Response.ShipInfoListResponse;
import com.learn.ecommerce.Service.Implementation.ShipInfoImp;
import com.learn.ecommerce.Ultis.AuthUtils;
import com.learn.ecommerce.Ultis.ModelMapperUtils;
import com.learn.ecommerce.user.User;
import com.learn.ecommerce.user.UserRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Getter
@RestController
@RequestMapping("/api/v1/user/shipInfo")
public class ShipInfoController {
    // Role: User

    private final ShipInfoImp service;

    private final UserRepository userRepository;

    public ShipInfoController (@Autowired ShipInfoImp s, @Autowired UserRepository userRepository){
        this.service = s;
        this.userRepository = userRepository;
    }

    @GetMapping("/get")
    public ResponseEntity<?> getAllShipInfo(){
        // Trả về tất cả địa chỉ giao hàng của user
        Optional<User> optionalUser = AuthUtils.getCurrentUser();

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<ShipInfo> shipInfoList = service.findByUserId(user.getId());
            List<ShipInfoListResponse> shipInfoResponseList = ModelMapperUtils.mapAll(shipInfoList, ShipInfoListResponse.class);
            return new ResponseEntity<>(shipInfoResponseList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

    }

    // Role: User
    @PostMapping("/add")
    public ResponseEntity<?> addShipInfo(@RequestBody CreateShipInfoRequest createShipInfoRequest){
        Optional<User> optionalUser = AuthUtils.getCurrentUser();
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            ShipInfo shipInfo = ModelMapperUtils.map(createShipInfoRequest, ShipInfo.class);
            shipInfo.setUser(user);

            ShipInfo savedShipInfo = service.addShipInfo(shipInfo);
            ShipInfoListResponse response = ModelMapperUtils.map(savedShipInfo, ShipInfoListResponse.class);

            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

    }

    // Role: User
    @PutMapping("/edit/{shipId}")
    public ResponseEntity<?> updateShipInfo(@PathVariable int shipId, @RequestBody EditShipInfoRequest editShipInfoRequest){
        Optional<User> optionalUser = AuthUtils.getCurrentUser();

        if (optionalUser.isPresent()) {
            Optional<ShipInfo> optionalShipInfo = service.findShipInfoById(shipId);

            if (optionalShipInfo.isPresent()) {
                User user = optionalUser.get();
                ShipInfo shipInfo = optionalShipInfo.get();

                // Check if the user owns the ShipInfo
                if (shipInfo.getUser().getId() == user.getId()) {
                    // Update ShipInfo
                    shipInfo.setFullName(editShipInfoRequest.getFullName());
                    shipInfo.setAddress(editShipInfoRequest.getAddress());
                    shipInfo.setPhone(editShipInfoRequest.getPhone());

                    ShipInfo updatedShipInfo = service.updateShipInfo(shipInfo);
                    ShipInfoListResponse response = ModelMapperUtils.map(updatedShipInfo, ShipInfoListResponse.class);

                    return new ResponseEntity<>(response, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("You do not have permission to edit this ShipInfo", HttpStatus.FORBIDDEN);
                }
            } else {
                return new ResponseEntity<>("ShipInfo not found", HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    // Role: User, người sở hữu shipInfo
    @DeleteMapping("/delete/{shipId}")
    public ResponseEntity<?> deleteShipInfo(@PathVariable int shipId){
        Optional<User> optionalUser = AuthUtils.getCurrentUser();

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            boolean isDeleted = service.deleteShipInfo(shipId);

            if (isDeleted) {
                return new ResponseEntity<>("ShipInfo deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("ShipInfo not found or you do not have permission", HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

}
