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

//  @Query("SELECT p FROM Product p WHERE (:title = '' or (:title != '' and p.name like %:title%)) and p.price >= :priceMin and p.price <= :priceMax " +
//          "and ((:categoryId > 0 and p.category.categoryId = :categoryId) or :categoryId = 0) and (:origins is null or (:origins is not null and p.origin in :origins)) " +
//          "and ( (:branchIds is not null and p.brand.brandId in :branchIds) or :branchIds is null ) and ((:rating >= 0 and (p.rating >= :rating and p.rating < :rating + 1))  or :rating = -1)")
//  Page<Product> searchProducts(@Param("title") String title, @Param("priceMin") Long priceMin,
//                               @Param("priceMax") Long priceMax, @Param("categoryId") Integer categoryId,
//                               @Param("branchIds") List<Integer> branchIds, @Param("origins") List<String> origins,
//                               @Param("rating") Integer rating, Pageable pageable);

  @Query("SELECT p as product, sum(o.quantity) as orders, avg(r.rate) as rating, count(r.reviewId) as reviewer FROM Product p LEFT JOIN Review r ON r.product.productId = p.productId LEFT JOIN OrderLine o ON p.productId = o.product.productId WHERE p.isDeleted = false and (:title = '' or (:title != '' and p.name like %:title%)) " +
          "and p.price >= :priceMin and p.price <= :priceMax and ((:categoryId > 0 and p.category.categoryId = :categoryId) or :categoryId = 0) and (:origins is null or (:origins is not null and p.origin in :origins)) " +
          "and ( (:branchIds is not null and p.brand.brandId in :branchIds) or :branchIds is null )" +
          "group by p.productId having :rating = -1 or (:rating >= 0 and (avg(r.rate) >= :rating and avg(r.rate) < :rating + 1)) ")
  Page<ProductQueryAdvanced> searchProductsAdvanced(@Param("title") String title, @Param("priceMin") Long priceMin,
                                                    @Param("priceMax") Long priceMax, @Param("categoryId") Integer categoryId,
                                                    @Param("branchIds") List<Integer> branchIds, @Param("origins") List<String> origins,
                                                    @Param("rating") Integer rating, Pageable pageable);
}