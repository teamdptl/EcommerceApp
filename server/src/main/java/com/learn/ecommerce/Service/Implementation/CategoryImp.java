package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.Category;
import com.learn.ecommerce.Service.CategoryService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class CategoryImp implements CategoryService {
    @Override
    public Optional<Category> FindByID(int id) {
        return Optional.empty();
    }

    @Override
    public Optional<Category> FindByUserName(String userName) {
        return Optional.empty();
    }

    @Override
    public List<Category> GetAll() {
        return null;
    }

    @Override
    public void Save(Category T) {

    }

    @Override
    public void Create() {

    }

    @Override
    public void Delete() {

    }
}
