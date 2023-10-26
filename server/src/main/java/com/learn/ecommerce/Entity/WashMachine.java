package com.learn.ecommerce.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "WashMachine")
public class WashMachine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int wmID;
    private int loaiMayGiat;
    private int khoiLuongGiat;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "productID")
    private Product product;

}
