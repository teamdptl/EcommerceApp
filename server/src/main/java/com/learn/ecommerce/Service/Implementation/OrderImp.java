package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.Order;
import com.learn.ecommerce.Service.OrderService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class OrderImp implements OrderService {
    @Override
    public Optional<Order> FindByID(int id) {
        return Optional.empty();
    }

    @Override
    public Optional<Order> FindByUserName(String userName) {
        return Optional.empty();
    }

    @Override
    public List<Order> GetAll() {
        return null;
    }

    @Override
    public void Save(Order T) {

    }

    @Override
    public void Create() {

    }

    @Override
    public void Delete() {

    }
}
