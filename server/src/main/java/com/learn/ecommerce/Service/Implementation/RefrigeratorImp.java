package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.Refrigerator;
import com.learn.ecommerce.Service.RefrigeratorService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class RefrigeratorImp implements RefrigeratorService {
    @Override
    public Optional<Refrigerator> FindByID(int id) {
        return Optional.empty();
    }

    @Override
    public Optional<Refrigerator> FindByUserName(String userName) {
        return Optional.empty();
    }

    @Override
    public List<Refrigerator> GetAll() {
        return null;
    }

    @Override
    public void Save(Refrigerator T) {

    }

    @Override
    public void Create() {

    }

    @Override
    public void Delete() {

    }
}
