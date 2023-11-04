package com.learn.ecommerce.Response;

import com.learn.ecommerce.Entity.Product;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductSearchQuery extends Product {
    private Long buyer;
}
