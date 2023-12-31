package com.learn.ecommerce.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE product SET is_deleted = true WHERE product_id = ?") // Soft delete
@Table(name = "Product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;
    private String name;
    @Lob @Column(length=10000)
    private String description;
    @Lob @Column(length=10000)
    private String thongSoKiThuat;
    private long price;
    private long oldPrice;
    private int warrantyMonths;
    private int quantity;
    private String origin;
    private String slugUrl;
    private boolean isDeleted = false;

    @Column(columnDefinition = "json")
    private String attributes;
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @ManyToMany
    @JoinTable(
            name = "Favorite",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> users = new HashSet<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private Set<Media> medias;
}
