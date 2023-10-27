package com.learn.ecommerce.Entity;

import com.learn.ecommerce.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    @EmbeddedId
    private CartKey id;
    private int quantity;
    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @Embeddable
    @Data
    public static class CartKey implements Serializable {
        @Column(name = "product_id")
        int productId;
        @Column(name = "user_id")
        int userId;
    }
}
