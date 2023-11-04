package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.Category;
import com.learn.ecommerce.Service.CategoryService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class CategoryImp implements CategoryService {
    public Optional<Category> FindByID(int id) {
        return Optional.empty();
    }

    public Optional<Category> FindByUserName(String userName) {
        return Optional.empty();
    }

    public List<Category> GetAll() {
        return null;
    }

    public void Save(Category T) {

    }

    public void Create() {

    }

    public void Delete() {

    }
}
