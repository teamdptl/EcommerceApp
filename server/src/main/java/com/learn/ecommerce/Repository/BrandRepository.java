package com.learn.ecommerce.Repository;
import com.learn.ecommerce.Entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Repository
 public interface BrandRepository extends JpaRepository<Brand,Integer>{
// SELECT DISTINCT b.name FROM `brand` b JOIN product p ON p.brand_id = b.brand_id WHERE p.category_id = 2;
  @Query("SELECT b FROM Brand b JOIN Product p ON p.brand.brandId = b.brandId WHERE p.category.categoryId = :categoryId GROUP BY b.brandId")
  List<Brand> findDistinctBrandsByCategory(@Param("categoryId") Integer categoryId);
  @Query("SELECT b FROM Brand b WHERE b.isDeleted = false")
  List<Brand> findAll();
}