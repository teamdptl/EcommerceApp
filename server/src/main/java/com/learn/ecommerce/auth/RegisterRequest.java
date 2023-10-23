package com.learn.ecommerce.auth;

import com.learn.ecommerce.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

  private String email;
  private String password;
  private String name;
  private String avatar;
  private String locate;
  private String username;
  private Role role;
}
