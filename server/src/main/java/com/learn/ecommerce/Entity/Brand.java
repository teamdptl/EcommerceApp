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
@Table(name = "Branch")
@SQLDelete(sql = "UPDATE branch SET is_deleted = true WHERE branch_id = ?") // Soft delete
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int brandId;
    private String name;
    private boolean isDeleted = false;
}
