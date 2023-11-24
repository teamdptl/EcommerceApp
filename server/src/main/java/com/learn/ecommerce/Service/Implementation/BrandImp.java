package com.learn.ecommerce.Service.Implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.learn.ecommerce.Entity.Brand;
import com.learn.ecommerce.Repository.BrandRepository;
import com.learn.ecommerce.Service.BrandService;
import org.springframework.stereotype.Component;

@Component
public class BrandImp implements BrandService {
    @Autowired
    private final BrandRepository repository;

    public BrandImp (@Autowired BrandRepository brand){
        this.repository = brand;
    }

    @Override
    public Optional<Brand> findById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public List<Brand> getAll() {
        return repository.findAll();
    }

    @Override
    public void save(Brand T) {
        repository.save(T);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public List<Brand> getListByCategory(int categoryId) {
        if (categoryId == 0) {
            return getAll();
        } else {
            return repository.findDistinctBrandsByCategory(categoryId);
        }

    }


}
