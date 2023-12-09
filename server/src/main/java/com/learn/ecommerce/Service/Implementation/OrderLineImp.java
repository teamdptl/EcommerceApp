package com.learn.ecommerce.Service.Implementation;

import com.learn.ecommerce.Entity.Order;
import com.learn.ecommerce.Entity.OrderLine;
import com.learn.ecommerce.Repository.OrderLineReponsitory;
import com.learn.ecommerce.Service.OrderLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class OrderLineImp implements OrderLineService {
    @Autowired
    private OrderLineReponsitory reponsitory;
    public List<OrderLine> getAllOrderLines(Integer orderId){
        return reponsitory.getAllOrderLines(orderId);
    };

    @Override
    public Optional<Order> findById(Integer id) {
        return Optional.empty();
    }

    @Override
    public List<Order> getAll() {
        return null;
    }

    @Override
    public void save(Order T) {

    }

    @Override
    public void delete(Integer id) {

    }
}
