package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.OrderLine;
import com.learn.ecommerce.Service.OrderLineService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class OrderLineImp implements OrderLineService {
    @Override
    public Optional<OrderLine> FindByID(int id) {
        return Optional.empty();
    }

    @Override
    public Optional<OrderLine> FindByUserName(String userName) {
        return Optional.empty();
    }

    @Override
    public List<OrderLine> GetAll() {
        return null;
    }

    @Override
    public void Save(OrderLine T) {

    }

    @Override
    public void Create() {

    }

    @Override
    public void Delete() {

    }
}
