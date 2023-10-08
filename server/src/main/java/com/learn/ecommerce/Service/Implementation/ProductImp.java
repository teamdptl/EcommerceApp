package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.Product;
import com.learn.ecommerce.Service.ProductService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class ProductImp implements ProductService {
    @Override
    public Optional<Product> FindByID(int id) {
        return Optional.empty();
    }

    @Override
    public Optional<Product> FindByUserName(String userName) {
        return Optional.empty();
    }

    @Override
    public List<Product> GetAll() {
        return null;
    }

    @Override
    public void Save(Product T) {

    }

    @Override
    public void Create() {

    }

    @Override
    public void Delete() {

    }
}
