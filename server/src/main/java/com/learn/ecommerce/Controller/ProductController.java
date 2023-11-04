package com.learn.ecommerce.Controller;

import com.learn.ecommerce.Entity.Brand;
import com.learn.ecommerce.Entity.Category;
import com.learn.ecommerce.Entity.Product;
import com.learn.ecommerce.Enum.ProductSortType;
import com.learn.ecommerce.Repository.BrandRepository;
import com.learn.ecommerce.Repository.CategoryReponsitory;
import com.learn.ecommerce.Request.CreateProductRequest;
import com.learn.ecommerce.Request.EditProductRequest;
import com.learn.ecommerce.Response.ErrorResponse;
import com.learn.ecommerce.Response.ProductDetailResponse;
import com.learn.ecommerce.Response.ProductListItemResponse;
import com.learn.ecommerce.Response.SuccessResponse;
import com.learn.ecommerce.Service.Implementation.ProductImp;
import com.learn.ecommerce.Ultis.ModelMapperUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/product")
public class ProductController {
    private final ProductImp service;
    private final BrandRepository brandRepository;

    private final CategoryReponsitory categoryReponsitory;
    public ProductController(@Autowired  ProductImp s, @Autowired BrandRepository brandRepository, @Autowired CategoryReponsitory categoryReponsitory) {
        this.service = s;
        this.brandRepository = brandRepository;
        this.categoryReponsitory = categoryReponsitory;
    }

    // Hàm dùng để tìm kiếm product
    @GetMapping("/search")
    public Page<ProductListItemResponse> getList(@RequestParam(defaultValue = "", required = false) String title,
                                                 @RequestParam(defaultValue = "0", required = false) Long priceMin,
                                                 @RequestParam(defaultValue = "1000000000", required = false) Long priceMax,
                                                 @RequestParam(defaultValue = "0", required = false) Integer categoryId,
                                                 @RequestParam(defaultValue = "0", required = false) Integer branchId,
                                                 @RequestParam(defaultValue = "", required = false) String origin,
                                                 @RequestParam(defaultValue = "-1", required = false) Integer rating,
                                                 @RequestParam(required = false) ProductSortType sortType,
                                                 @RequestParam(defaultValue = "0", required = false) Integer page){
        Page<Product> products = service.searchProducts(title, priceMin, priceMax, categoryId, branchId, origin, rating, sortType, PageRequest.of(page, 12));
        return ModelMapperUtils.mapEntityPageIntoDtoPage(products, ProductListItemResponse.class);
    }

    // Hàm này dùng để lấy thông tin sản phẩm
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getProductDetail(@PathVariable("id") int id){
        Optional<Product> p = service.findById(id);
        if (p.isPresent()){
            ProductDetailResponse d = ModelMapperUtils.map(p.get(), ProductDetailResponse.class);
            // TODO: Gắn token vào và check nó có yêu thích sản phẩm này không
            // d.isFavorite = true
            return ResponseEntity.ok(d);
        }
        return ResponseEntity.badRequest().body(new ErrorResponse("Không tìm thấy sản phẩm"));
    }

    // Hàm dùng để thêm sản phẩm
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@ModelAttribute @Valid CreateProductRequest createData, BindingResult result){
        if (result.hasErrors()){
            return ResponseEntity.badRequest().body(new ErrorResponse("Dữ liệu " +result.getFieldError().getField()+" không hợp lệ !"));
        }
        Product product = ModelMapperUtils.map(createData, Product.class);
        Optional<Brand> brand = brandRepository.findById(createData.getBranchId());
        if (brand.isEmpty())
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Branch không tồn tại!"));
        Optional<Category> category = categoryReponsitory.findById(createData.getCategoryId());
        if (category.isEmpty())
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Category không tồn tại!"));
        product.setBrand(brand.get());
        product.setCategory(category.get());
        service.saveProductWithMedia(product, List.of(createData.getFiles()));
        return ResponseEntity.ok(new SuccessResponse("Tạo thành công"));
    }

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
        Optional<Brand> brand = brandRepository.findById(editData.getBranchId());
        if (brand.isEmpty())
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Branch không tồn tại!"));
        Optional<Category> category = categoryReponsitory.findById(editData.getCategoryId());
        if (category.isEmpty())
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Category không tồn tại!"));
        product.setBrand(brand.get());
        product.setCategory(category.get());
        if (editData.getFiles().length > 0)
            service.saveProductWithMedia(product, List.of(editData.getFiles()));
        return ResponseEntity.ok(new SuccessResponse("Tạo thành công"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable int id){
        Optional<Product> p = service.findById(id);
        if (p.isPresent()){
            service.delete(id);
            return ResponseEntity.ok(new SuccessResponse("Đã xóa thành công "+p.get().getName()));
        }
        return ResponseEntity.badRequest().body(new ErrorResponse("Không tồn tại sản phẩm có id là "+id));
    }
}
