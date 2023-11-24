package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.OrderLine;
import com.learn.ecommerce.Service.OrderLineService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class OrderLineImp implements OrderLineService {
    public Optional<OrderLine> FindByID(int id) {
        return Optional.empty();
    }

    public Optional<OrderLine> FindByUserName(String userName) {
        return Optional.empty();
    }

    public List<OrderLine> GetAll() {
        return null;
    }

    public void Save(OrderLine T) {

    }

    public void Create() {

    }

    public void Delete() {

    }
}
