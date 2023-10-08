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
    @MapsId("productID")
    @JoinColumn(name = "product_id")
    private Product product;
    @ManyToOne
    @MapsId("orderID")
    @JoinColumn(name = "order_id")
    private Order order;
    @Embeddable
    @Data
    public static class OrderLineKey implements Serializable {
        @Column(name = "product_id")
        int productID;
        @Column(name = "order_id")
        int orderID;
    }
}
