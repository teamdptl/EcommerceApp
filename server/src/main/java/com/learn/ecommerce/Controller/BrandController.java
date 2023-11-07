package com.learn.ecommerce.Controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/brand")
public class BrandController {
    // Hàm trả về các hãng ứng với thể loại
    @GetMapping("/get")
    public ResponseEntity<?> getBrands(@RequestParam(defaultValue = "0", required = false) Integer categoryId ){
        // Nếu category = 0 thì trả về all
        // Ngược lại trả về các brand của product thuộc category Id

        // @Query ("SELECT b FROM Brand b JOIN Product p ON p.brand.brandId = b.brandId and p.category.categoryId = :categoryId)
        return ResponseEntity.ok("ok");
    }

    // ROLE: Manager
    // Thêm brand
    @PostMapping("/add")
    public ResponseEntity<?> addBrand(@RequestPart("name") String brandName){
        return ResponseEntity.ok("ok");
    }

    // ROLE: Manager
    @PutMapping("/update")
    public ResponseEntity<?> updateBrand(@RequestPart("id") Integer brandId, @RequestPart("name") String brandName){
        return ResponseEntity.ok("ok");
    }

    // ROLE: Manager
    @DeleteMapping("/delete/{brandId}")
    public ResponseEntity<?> deleteBrand(@PathVariable String brandId){
        return ResponseEntity.ok("ok");
    }
}
