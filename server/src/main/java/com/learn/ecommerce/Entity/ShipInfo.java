package com.learn.ecommerce.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ShipInfo")
public class ShipInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int shipfoID;
    private int fullname;
    private String addreess;
    private String phone;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
