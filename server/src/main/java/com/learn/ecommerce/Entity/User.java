package com.learn.ecommerce.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userID;
    private String name;
    private String email;
    private String avatar;
    private String locate;
    private String username;
    private String password;
    private boolean isEmailVerified;
    @ManyToMany(mappedBy = "users")
    private Set<Product> products = new HashSet<>();
    @ManyToMany(mappedBy = "users")
    private Set<Role> roles = new HashSet<>();


}
