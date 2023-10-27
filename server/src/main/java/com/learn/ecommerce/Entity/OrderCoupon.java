package com.learn.ecommerce.Entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "OrderCoupon")
public class OrderCoupon {
    @EmbeddedId
    private OrderCouponKey id;
    private Date dateTime;
    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    private Order order;
    @ManyToOne
    @MapsId("couponId")
    @JoinColumn(name = "coupon_id")
    private Coupon coupon;
    @Embeddable
    @Data
    public static class OrderCouponKey implements Serializable {
        @Column(name = "coupon_id")
        int couponId;
        @Column(name = "order_id")
        int orderId;
    }
}
