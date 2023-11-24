package com.learn.ecommerce.Service.Implementation;

import com.learn.ecommerce.Entity.Category;
import com.learn.ecommerce.Repository.CategoryRepository;
import com.learn.ecommerce.Service.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;

@Component
public class CategoryImp implements CategoryService {

    private final CategoryRepository repository;

    public CategoryImp(@Autowired CategoryRepository rep) {
        this.repository = rep;
    }

    @Override
    public Optional<Category> findById(Integer id) {
        // TODO Auto-generated method stub
        return repository.findById(id);
    }

    @Override
    public List<Category> getAll() {
        // TODO Auto-generated method stub
        return repository.findAll();
        // throw new UnsupportedOperationException("Unimplemented method 'getAll'");
    }

    @Override
    public void save(Category T) {
        // TODO Auto-generated method stub
        repository.save(T);
    }

    @Override
    public void delete(Integer id) {
        // TODO Auto-generated method stub
        repository.deleteById(id);
    }

    public boolean existsByName(String name) {
        return false;
    }
}
