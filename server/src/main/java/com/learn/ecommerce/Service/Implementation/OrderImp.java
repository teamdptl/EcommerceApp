package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.Order;
import com.learn.ecommerce.Repository.OrderReponsitory;
import com.learn.ecommerce.Service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
@Component
public class OrderImp implements OrderService {

    private final OrderReponsitory reponsitory;

    OrderImp(@Autowired OrderReponsitory reponsitory){
        this.reponsitory = reponsitory;
    }

    public Optional<Order> FindByID(int id) {
        return Optional.empty();
    }

    public Optional<Order> FindByUserName(String userName) {
        return Optional.empty();
    }

    public List<Order> getFilterOrders(Date time_start, Date time_end, Integer status, Integer isAllStatus) {
        return reponsitory.getFilterOrders(time_start, time_end, status, isAllStatus);
    }

    public void Save(Order T) {

    }

    public void Create() {

    }

    public void Delete() {

    }
}
