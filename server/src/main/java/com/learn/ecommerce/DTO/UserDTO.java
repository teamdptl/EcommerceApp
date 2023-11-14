package com.learn.ecommerce.DTO;


import com.learn.ecommerce.Entity.Role;
import lombok.Data;

@Data
public class UserDTO {

    private Integer id;
    private String email;
    private String fullname;
    private String avatar;
    private String locate;
    private Role role;
}
