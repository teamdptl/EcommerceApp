package com.learn.ecommerce.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import org.hibernate.annotations.SQLDelete;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Brand")
@SQLDelete(sql = "UPDATE brand SET is_deleted = true WHERE brand_id = ?") // Soft delete
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int brandId;
    private String name;
    private boolean isDeleted = false;

    @OneToMany(mappedBy = "brand", cascade = CascadeType.ALL)
    private List<Product> products = new ArrayList<>();
}
