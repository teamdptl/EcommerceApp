 package com.learn.ecommerce.Service
;

 import com.learn.ecommerce.Repository.ProductQueryAdvanced;
 import com.learn.ecommerce.Entity.User;
 import org.springframework.data.domain.Page;
 import org.springframework.data.domain.Pageable;
 import org.springframework.stereotype.Service;
 import com.learn.ecommerce.Entity.Product;
 import org.springframework.web.multipart.MultipartFile;

 import java.util.List;

 @Service
 public interface ProductService extends RootService<Product, Integer> {

//  Page<Product> searchProducts(String title, Long priceMin, Long priceMax, Integer categoryId, List<Integer> branchIds, List<String> origins, Integer rating, int type, int page);

  Page<ProductQueryAdvanced> searchProductsAdvanced(String title, Long priceMin, Long priceMax, Integer categoryId, List<Integer> branchIds, List<String> origins, Integer rating, int type, int page);

     List<Product> getProductInList(List<Integer> ids);

     public void favoriteProduct(Product product, User user);

  public Page<Product> favoriteList(User user, Pageable pageable);

  public List<Product> featureProducts(Integer page);

  void saveProductWithMedia(Product product, List<MultipartFile> files, Integer primaryImageIndex);

  void removeProductMedia(Product product, Integer[] mediaIds);
 }