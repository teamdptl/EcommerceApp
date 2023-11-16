package com.learn.ecommerce.Service;

import com.learn.ecommerce.Entity.Brand;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface BrandService extends RootService<Brand, Integer> {

    public List<Brand> getListByCategory(int categoryId);

}
