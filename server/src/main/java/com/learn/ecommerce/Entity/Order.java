package com.learn.ecommerce.Entity;

import com.learn.ecommerce.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.sql.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Orders")
@SQLDelete(sql = "UPDATE order SET is_deleted = true WHERE order_id = ?") // Soft delete
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    private int orderStatus = 0;
    private boolean paymentStatus = false;
    private String paymentMethod;
    private long totalPrice = 0;

    private Date createAt;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "ship_id")
    private ShipInfo shipInfo;

    private boolean isDeleted = false;
}
