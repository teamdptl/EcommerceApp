package com.learn.ecommerce.Entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "OrderLine")
public class OrderLine {
    @EmbeddedId
    private OrderLineKey id;
    private long price;
    private int quantity;
    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;
    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    private Order order;
    @Embeddable
    @Data
    public static class OrderLineKey implements Serializable {
        @Column(name="product_id")
        private int productId;
        @Column(name="order_id")
        private int orderId;
    }
}
