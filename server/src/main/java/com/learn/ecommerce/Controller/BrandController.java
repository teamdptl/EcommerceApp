package com.learn.ecommerce.Controller;

import java.util.List;
import java.util.Optional;

import com.learn.ecommerce.Request.CreateBrandRequest;
import com.learn.ecommerce.Response.BrandListResponse;
import com.learn.ecommerce.Service.Implementation.BrandImp;
import com.learn.ecommerce.Ultis.ModelMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.learn.ecommerce.Entity.Brand;
import com.learn.ecommerce.Service.BrandService;

@RestController
@RequestMapping("/api/v1/brand")


public class BrandController {

    @Autowired
    private BrandImp brandImp;

    public BrandController(@Autowired BrandImp brand) {
        this.brandImp = brand;
    }

    // Hàm trả về các hãng ứng với thể loại
    @GetMapping("/get")
    public List<BrandListResponse> getBrands(@RequestParam(defaultValue = "0", required = false) Integer categoryId) {
        // Nếu category = 0 thì trả về all
        // Ngược lại trả về các brand của product thuộc category Id

        // @Query ("SELECT DISTINCT b FROM Brand b JOIN Product p ON p.brand.brandId =
        // b.brandId and p.category.categoryId = :categoryId)
        // } else {
        // Optional<Brand> brands = brandService.findById();
        // }
        List<Brand> brands = brandImp.getListByCategory(categoryId);
        return ModelMapperUtils.mapAll(brands, BrandListResponse.class);
    }

    // ROLE: Manager
    // Thêm brand
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<?> addBrand(@RequestBody CreateBrandRequest brandRequest) {
        Brand brand = new Brand();

        // Kiểm tra xem tên thương hiệu có được cung cấp không
        if (brandRequest.getName() == null || brandRequest.getName().isEmpty()) {
            return ResponseEntity.badRequest().body("Tên thương hiệu không được để trống");
        }

        // Kiểm tra xem tên thương hiệu có vượt quá độ dài cho phép không
        if (brandRequest.getName().length() > 255) {
            return ResponseEntity.badRequest().body("Tên thương hiệu quá dài, vui lòng nhập ít hơn 255 ký tự");
        }

        // Kiểm tra các điều kiện khác nếu cần

        // Nếu mọi điều kiện đều hợp lệ, tiếp tục gán giá trị và lưu
        brand.setName(brandRequest.getName());
        brandImp.save(brand);

        return ResponseEntity.ok(brand);

    }

    // ROLE: Manager
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{brandId}")
    public ResponseEntity<?> updateBrand(@PathVariable int brandId, @RequestBody CreateBrandRequest brandRequest) {
        // Kiểm tra xem brandId có tồn tại hay không
        Optional<Brand> brandOptional = brandImp.findById(brandId);
        if (brandOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // Lấy đối tượng Brand từ Optional
        Brand brand1 = brandOptional.get();

        // Kiểm tra xem brandRequest có chứa tên thương hiệu hay không
        if (brandRequest.getName() == null || brandRequest.getName().isEmpty()) {
            return ResponseEntity.badRequest().body("Tên thương hiệu không được để trống");
        }

        // Kiểm tra xem tên thương hiệu có vượt quá độ dài cho phép không
        if (brandRequest.getName().length() > 255) {
            return ResponseEntity.badRequest().body("Tên thương hiệu quá dài, vui lòng nhập ít hơn 255 ký tự");
        }

        // Cập nhật thông tin của đối tượng Brand
        brand1.setName(brandRequest.getName());

        // Lưu đối tượng Brand đã được cập nhật
        brandImp.save(brand1);

        // Trả về ResponseEntity thành công cùng với đối tượng Brand đã cập nhật
        return ResponseEntity.ok(brand1);

    }

    // ROLE: Manager
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{brandId}")
    public ResponseEntity<?> deleteBrand(@PathVariable int brandId) {

        brandImp.delete(brandId);
        return ResponseEntity.ok("OK");
    }
}
