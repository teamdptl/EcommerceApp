package com.learn.ecommerce.Service;

import org.springframework.stereotype.Service;
import com.learn.ecommerce.Entity.Order;
@Service
public interface OrderLineService extends RootService<Order, Integer> {
}