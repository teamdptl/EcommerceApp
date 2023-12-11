package com.learn.ecommerce.Controller;

import com.learn.ecommerce.Entity.Brand;
import com.learn.ecommerce.Entity.Category;
import com.learn.ecommerce.Entity.Media;
import com.learn.ecommerce.Entity.Product;
import com.learn.ecommerce.Entity.User;
import com.learn.ecommerce.Repository.CategoryRepository;
import com.learn.ecommerce.Repository.ProductQueryAdvanced;
import com.learn.ecommerce.Repository.BrandRepository;
import com.learn.ecommerce.Request.CreateProductRequest;
import com.learn.ecommerce.Request.EditProductRequest;
import com.learn.ecommerce.Response.*;
import com.learn.ecommerce.Service.Implementation.MediaImp;
import com.learn.ecommerce.Service.Implementation.ProductImp;
import com.learn.ecommerce.Ultis.AuthUtils;
import com.learn.ecommerce.Ultis.ModelMapperUtils;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/product")
public class ProductController {
    private final ProductImp service;

    private final MediaImp mediaImp;

    private final BrandRepository brandRepository;

    private final CategoryRepository categoryRepository;
    
    private final AuthUtils authUtils;

    public ProductController(@Autowired ProductImp s, @Autowired MediaImp mediaImp, @Autowired BrandRepository brandRepository, @Autowired CategoryRepository categoryRepository, @Autowired AuthUtils authUtils) {
        this.service = s;
        this.mediaImp = mediaImp;
        this.brandRepository = brandRepository;
        this.categoryRepository = categoryRepository;
        this.authUtils = authUtils;
    }

    // Hàm dùng để tìm kiếm product
    @GetMapping("/search")
    public Page<ProductListItemResponse> getList(@RequestParam(defaultValue = "", required = false) String title,
                                                 @RequestParam(defaultValue = "0", required = false) Long priceMin,
                                                 @RequestParam(defaultValue = "1000000000", required = false) Long priceMax,
                                                 @RequestParam(defaultValue = "0", required = false) Integer categoryId,
                                                 @RequestParam(defaultValue = "", required = false) List<Integer> branchIds,
                                                 @RequestParam(defaultValue = "", required = false) List<String> origins,
                                                 @RequestParam(defaultValue = "-1", required = false) Integer rating,
                                                 @RequestParam(defaultValue = "0",required = false) int sortType,
                                                 @RequestParam(defaultValue = "0", required = false) Integer page,
                                                 @RequestParam(defaultValue = "10", required = false) Integer perPage){
        if (branchIds.isEmpty())
            branchIds = null;
        if (origins.isEmpty())
            origins = null;
        Page<ProductQueryAdvanced> products = service.searchProductsAdvanced(title, priceMin, priceMax, categoryId, branchIds, origins, rating, sortType, page, perPage);
        return products.map((product) -> {
            ProductListItemResponse item = ModelMapperUtils.map(product.getProduct(), ProductListItemResponse.class);
            if (product.getOrders() != null)
                item.setOrderCount(product.getOrders());
            if (product.getRating() != null)
                item.setRating(product.getRating());
            item.setReviewCount(product.getReviewer());
            Optional<Media> media = mediaImp.getProductPrimaryMedia(product.getProduct().getProductId());
            item.setImageUrl(Media.DEFAULT_IMAGE);
            media.ifPresent(value -> {
                if (value.isExternalImage())
                    item.setImageUrl(value.getImageUrl());
                else {
                    item.setImageUrl(MainController.url+"/"+Media.mediaPath+value.getImageUrl());
                }
            });
            return item;
        });
    }

    // Hàm này dùng để lấy thông tin sản phẩm
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getProductDetail(@PathVariable("id") int id){
        Optional<Product> p = service.findById(id);
        if (p.isPresent()){
            Optional<User> userOptional = authUtils.getCurrentUser();
            List<Media> medias = mediaImp.getMediasByProduct(p.get());
            ProductDetailResponse d = ModelMapperUtils.map(p.get(), ProductDetailResponse.class);
            List<MediaResponse> images = ModelMapperUtils.mapAll(medias, MediaResponse.class);
            List<MediaResponse> mappedImages = images.stream().peek(item -> {
                if (item.isExternalImage())
                    item.setImageUrl(item.getImageUrl());
                else {
                    item.setImageUrl(MainController.url+"/"+Media.mediaPath+item.getImageUrl());
                }
            }).toList();
            if(userOptional.isPresent()){
                p.get().getUsers().forEach(user -> {
                    System.out.println(user.getId());
                    if(user.getId() == userOptional.get().getId()){
                        d.setFavorite(true);
                        System.out.println("User " + user.getFullname() + " thích sản phẩm này!");
                    }

                });
            }
            d.setCategoryId(p.get().getCategory().getCategoryId());
            d.setBrandId(p.get().getBrand().getBrandId());
            d.setMedias(mappedImages);
            // TODO: Gắn token vào và check nó có yêu thích sản phẩm này không
            // d.isFavorite = true
            return ResponseEntity.ok(d);
        }
        return ResponseEntity.badRequest().body(new ErrorResponse("Không tìm thấy sản phẩm"));
    }

    @GetMapping("/getList")
    public List<ProductListItemResponse> getListProductDetail(@RequestParam(required = true) List<Integer> listId){
        List<Product> products = service.getProductInList(listId);
        List<ProductListItemResponse> listItem = ModelMapperUtils.mapAll(products, ProductListItemResponse.class);
        listItem.forEach(item -> {
            Optional<Media> media = mediaImp.getProductPrimaryMedia(item.getProductId());
            item.setImageUrl(Media.DEFAULT_IMAGE);
            media.ifPresent(value -> {
                if (value.isExternalImage())
                    item.setImageUrl(value.getImageUrl());
                else {
                    item.setImageUrl(MainController.url+"/"+Media.mediaPath+value.getImageUrl());
                }
            });
        });
        return listItem;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@ModelAttribute @Valid CreateProductRequest createData, BindingResult result){
        if (result.hasErrors()){
            return ResponseEntity.badRequest().body(new ErrorResponse("Dữ liệu " +result.getFieldError().getField()+" không hợp lệ !"));
        }
        Product product = ModelMapperUtils.map(createData, Product.class);
        Optional<Brand> brand = brandRepository.findById(createData.getBrandId());
        if (brand.isEmpty())
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Branch không tồn tại!"));
        Optional<Category> category = categoryRepository.findById(createData.getCategoryId());
        if (category.isEmpty())
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Category không tồn tại!"));
        product.setBrand(brand.get());
        product.setCategory(category.get());
        service.saveProductWithMedia(product, createData.getFileIds(), createData.getPrimaryImageIndex());
        return ResponseEntity.ok(new SuccessResponse("Tạo thành công"));
    }
    @PreAuthorize("hasRole('ADMIN')")// Role: Manager
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editProduct(@PathVariable("id") int id, @ModelAttribute @Valid EditProductRequest editData, BindingResult result){
        if (result.hasErrors()){
            return ResponseEntity.badRequest().body(new ErrorResponse("Dữ liệu " +result.getFieldError().getField()+" không hợp lệ !"));
        }
        Optional<Product> p = service.findById(id);
        if (p.isEmpty())
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Sản phẩm không tồn tại!"));

        Product product = ModelMapperUtils.map(editData, Product.class);
        product.setProductId(id);
        Optional<Brand> brand = brandRepository.findById(editData.getBrandId());
        if (brand.isEmpty())
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Branch không tồn tại!"));
        Optional<Category> category = categoryRepository.findById(editData.getCategoryId());
        if (category.isEmpty())
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Category không tồn tại!"));
        product.setBrand(brand.get());
        product.setCategory(category.get());
        service.saveProductWithMedia(product, editData.getFileIds(), editData.getPrimaryImageIndex());
        return ResponseEntity.ok(new SuccessResponse("Tạo thành công"));
    }

    @PreAuthorize("hasRole('ADMIN')")// Role: Manager
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable int id){
        Optional<Product> p = service.findById(id);
        if (p.isPresent()){
            service.delete(id);
            return ResponseEntity.ok(new SuccessResponse("Đã xóa thành công "+p.get().getName()));
        }
        return ResponseEntity.badRequest().body(new ErrorResponse("Không tồn tại sản phẩm có id là "+id));
    }

    @PreAuthorize("hasRole('USER')")// Role: User
    @GetMapping("/favorite")
    public ResponseEntity<?> getUserFavorite(){
        Optional<User> usr = authUtils.getCurrentUser();
        if (usr.isEmpty())
            return ResponseEntity.badRequest().build();
        Set<Product> products = service.getFavoriteProduct(usr.get());
        List<ProductFavoriteItem> list = ModelMapperUtils.mapAll(products, ProductFavoriteItem.class).stream().map(item -> {
            Optional<Media> media = mediaImp.getProductPrimaryMedia(item.getProductId());
            item.setImageUrl(Media.DEFAULT_IMAGE);
            media.ifPresent(value -> {
                if (value.isExternalImage())
                    item.setImageUrl(value.getImageUrl());
                else {
                    item.setImageUrl(MainController.url+"/"+Media.mediaPath+value.getImageUrl());
                }
            });
            return item;
        }).toList();
        return ResponseEntity.ok(list);
    }

    @PreAuthorize("hasRole('USER')")// Role: User
    @GetMapping("/add-favorite/{productID}")
    public ResponseEntity<?> addUserFavorite(@PathVariable Integer productID){
        Optional<User> userOptional = authUtils.getCurrentUser();
        if(userOptional.isPresent()){
            Optional<Product> pOptional = service.findById(productID);
            if(pOptional.isPresent()){
                pOptional.get().getUsers().add(userOptional.get());
                service.save(pOptional.get());
                return ResponseEntity.ok("Ok");
            }
            return ResponseEntity.badRequest().body("Không tìm thấy sản phẩm!");
        }
        return ResponseEntity.badRequest().body("Vui lòng tải lại trang!");
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/delete-favorite/{productID}")
    public ResponseEntity<?> deleteFavorite(@PathVariable Integer productID){

        Optional<User> userOptional = authUtils.getCurrentUser();
        if(userOptional.isPresent()){
            Optional<Product> pOptional = service.findById(productID);
            if(pOptional.isPresent()){
                pOptional.get().getUsers().remove(userOptional.get());
                service.save(pOptional.get());
                return ResponseEntity.ok("Ok");
            }
            return ResponseEntity.badRequest().body("Không tìm thấy sản phẩm!");
        }
        return ResponseEntity.badRequest().body("Vui lòng tải lại trang!");
    }
}
