package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.Order;
import com.learn.ecommerce.Service.OrderService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class OrderImp implements OrderService {
    public Optional<Order> FindByID(int id) {
        return Optional.empty();
    }

    public Optional<Order> FindByUserName(String userName) {
        return Optional.empty();
    }

    public List<Order> GetAll() {
        return null;
    }

    public void Save(Order T) {

    }

    public void Create() {

    }

    public void Delete() {

    }
}
