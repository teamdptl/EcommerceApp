package com.learn.ecommerce.Controller;

import java.util.List;
import java.util.Optional;

import com.learn.ecommerce.Request.CreateBrandRequest;
import com.learn.ecommerce.Response.BrandListResponse;
import com.learn.ecommerce.Service.Implementation.BrandImp;
import com.learn.ecommerce.Ultis.ModelMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.learn.ecommerce.Entity.Brand;
import com.learn.ecommerce.Service.BrandService;

@RestController
@RequestMapping("/api/v1/brand")
public class BrandController {

    @Autowired
    private BrandImp brandImp;

    public BrandController (@Autowired BrandImp brand){
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
    @PostMapping("/add")
    public ResponseEntity<?> addBrand(@RequestBody CreateBrandRequest brandRequest) {
        Brand brand = new Brand();
        brand.setName(brandRequest.getName());

        brandImp.save(brand);
        return ResponseEntity.ok("OK");


    }

    // ROLE: Manager
    @PutMapping("/update/{brandId}")
    public ResponseEntity<?> updateBrand(@PathVariable int brandId, @RequestBody CreateBrandRequest brandRequest) {
        Optional<Brand> brand = brandImp.findById(brandId);

        Brand brand1 = brand.get();

        brand1.setName(brandRequest.getName());

        brandImp.save(brand1);

        return ResponseEntity.ok("OK");
    }

    // ROLE: Manager
    @DeleteMapping("/delete/{brandId}")
    public ResponseEntity<?> deleteBrand(@PathVariable int brandId) {

            brandImp.delete(brandId);
            return ResponseEntity.ok("OK");
    }
}
