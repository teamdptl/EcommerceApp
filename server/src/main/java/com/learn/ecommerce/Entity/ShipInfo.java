package com.learn.ecommerce.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ShipInfo")
@SQLDelete(sql = "UPDATE ship_info SET is_deleted = true WHERE ship_id = ?") // Soft delete
public class ShipInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int shipId;
    private String fullName;
    private String address;
    private String phone;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private boolean isDeleted = false;
}
