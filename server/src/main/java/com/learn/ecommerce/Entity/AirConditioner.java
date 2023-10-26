package com.learn.ecommerce.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "AirConditioner")
public class AirConditioner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int acId;
    private int loaiMayLanh;
    private float congSuat;
    private boolean isInverter;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private Product product;
}
