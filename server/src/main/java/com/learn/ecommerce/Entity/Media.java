package com.learn.ecommerce.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Media")
public class Media {
    public static final String DEFAULT_IMAGE = "https://www.aaronfaber.com/wp-content/uploads/2017/03/product-placeholder-wp.jpg";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int imageId;
    private String imageUrl;
    private boolean isPrimary;
    private boolean isExternalImage = false;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
