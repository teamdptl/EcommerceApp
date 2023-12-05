package com.learn.ecommerce.Repository;

import com.learn.ecommerce.Entity.Product;
public interface ProductQueryAdvanced{
     Product getProduct();
     Long getOrders();
     Double getRating();
     Integer getReviewer();
}
