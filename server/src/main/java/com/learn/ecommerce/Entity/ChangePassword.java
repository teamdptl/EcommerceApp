package com.learn.ecommerce.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class ChangePassword {
    @Id
    private String UUID;
    private Date expiration;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
