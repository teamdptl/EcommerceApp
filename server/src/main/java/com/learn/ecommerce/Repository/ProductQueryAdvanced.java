package com.learn.ecommerce.Repository;

import com.learn.ecommerce.Entity.Product;
import lombok.Getter;
import lombok.Setter;

public interface ProductQueryAdvanced{
     Product getProduct();
     Long getOrders();
     Double getRating();
     Integer getReviewer();
}
