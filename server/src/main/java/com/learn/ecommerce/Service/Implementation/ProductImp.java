package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.Product;
import com.learn.ecommerce.Repository.ProductQueryAdvanced;
import com.learn.ecommerce.Repository.ProductRepository;
import com.learn.ecommerce.Service.ProductService;
import com.learn.ecommerce.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
@Component
public class ProductImp implements ProductService {
    private final ProductRepository reponsitory;
    private final MediaImp mediaImp;
    public ProductImp(@Autowired ProductRepository repo, @Autowired MediaImp mediaImp) {
        this.reponsitory = repo;
        this.mediaImp = mediaImp;
    }

    @Override
    public Optional<Product> findById(Integer id) {
        return reponsitory.findById(id);
    }

    @Override
    public List<Product> getAll() {
        return reponsitory.findAll();
    }

    @Override
    public void save(Product T) {
        reponsitory.save(T);
    }

    @Override
    public void delete(Integer id) {
        reponsitory.deleteById(id);
    }

//    @Override
//    public Page<Product> searchProducts(String title, Long priceMin, Long priceMax, Integer categoryId, List<Integer> branchIds, List<String> origins, Integer rating, int type, int page) {
//        return reponsitory.searchProducts(title, priceMin, priceMax, categoryId, branchIds, origins, rating, PageRequest.of(page, 12));
//    }

    @Override
    public Page<ProductQueryAdvanced> searchProductsAdvanced(String title, Long priceMin, Long priceMax, Integer categoryId, List<Integer> branchIds, List<String> origins, Integer rating, int type, int page) {
        final int perPage = 10;
        switch (type){
            case 0 -> {
                return reponsitory.searchProductsAdvanced(title, priceMin, priceMax, categoryId, branchIds, origins, rating, PageRequest.of(page, perPage, Sort.by("orders").descending()));
            }
            case 1 -> {
                return reponsitory.searchProductsAdvanced(title, priceMin, priceMax, categoryId, branchIds, origins, rating, PageRequest.of(page, perPage, Sort.by("rating").descending()));
            }
            case 2 -> {
                return reponsitory.searchProductsAdvanced(title, priceMin, priceMax, categoryId, branchIds, origins, rating, PageRequest.of(page, perPage, Sort.by("price").ascending()));
            }
            case 3 -> {
                return reponsitory.searchProductsAdvanced(title, priceMin, priceMax, categoryId, branchIds, origins, rating, PageRequest.of(page, perPage, Sort.by("price").descending()));
            }
            default -> {
                return reponsitory.searchProductsAdvanced(title, priceMin, priceMax, categoryId, branchIds, origins, rating, PageRequest.of(page, perPage, Sort.by("orders").descending()));
            }
        }

    }

    @Override
    public void favoriteProduct(Product product, User user) {
        product.getUsers().add(user);
    }

    @Override
    public Page<Product> favoriteList(User user, Pageable pageable) {
        return reponsitory.findFavoriteProducts(user.getId(), pageable);
    }

    @Override
    public List<Product> featureProducts(Integer page) {
        return null;
    }

    @Override
    public void saveProductWithMedia(Product product, List<MultipartFile> files) {
        Product saved = reponsitory.save(product);
        mediaImp.saveFiles(files, saved);
    }
}
