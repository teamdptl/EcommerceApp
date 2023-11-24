package com.learn.ecommerce.Request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
  @NotEmpty
  @Email
  private String email;
  @NotEmpty
  private String password;
  @NotEmpty
  private String fullname;

}
