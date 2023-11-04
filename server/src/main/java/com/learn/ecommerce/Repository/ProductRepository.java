package com.learn.ecommerce.Repository;
import com.learn.ecommerce.Entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer>{
  @Query("SELECT p FROM Product p JOIN p.users u WHERE u.id = :userId")
  Page<Product> findFavoriteProducts(@Param("userId") Integer userId, Pageable pageable);

  @Query("SELECT p FROM Product p WHERE (:title = '' or (:title != '' and p.name like %:title%)) and p.price >= :priceMin and p.price <= :priceMax " +
          "and ((:categoryId > 0 and p.category.categoryId = :categoryId) or :categoryId = 0) and (:origin = '' or (:origin != '' and p.origin like %:origin%)) " +
          "and ( (:branchId > 0 and p.brand.brandId = :branchId) or :branchId = 0 ) and ((:rating >= 0 and (p.rating >= :rating and p.rating < :rating + 1))  or :rating = -1)")
  Page<Product> searchProducts(@Param("title") String title, @Param("priceMin") Long priceMin,
                               @Param("priceMax") Long priceMax, @Param("categoryId") Integer categoryId,
                               @Param("branchId") Integer branchId, @Param("origin") String origin,
                               @Param("rating") Integer rating, Pageable pageable);
}