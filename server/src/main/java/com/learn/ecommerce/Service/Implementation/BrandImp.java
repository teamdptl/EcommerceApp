package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.Brand;
import com.learn.ecommerce.Service.BrandService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class BrandImp implements BrandService {
    @Override
    public Optional<Brand> FindByID(int id) {
        return Optional.empty();
    }

    @Override
    public Optional<Brand> FindByUserName(String userName) {
        return Optional.empty();
    }

    @Override
    public List<Brand> GetAll() {
        return null;
    }

    @Override
    public void Save(Brand T) {

    }

    @Override
    public void Create() {

    }

    @Override
    public void Delete() {

    }
}
