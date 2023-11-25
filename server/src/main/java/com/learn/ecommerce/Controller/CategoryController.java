package com.learn.ecommerce.Controller;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
// import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.learn.ecommerce.Entity.Category;
import com.learn.ecommerce.Request.CreateCategoryRequest;
import com.learn.ecommerce.Response.ErrorResponse;
import com.learn.ecommerce.Service.Implementation.CategoryImp;

import ch.qos.logback.core.joran.util.beans.BeanUtil;
import io.micrometer.common.lang.Nullable;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.persistence.PersistenceUnit;
import jakarta.persistence.PersistenceUnits;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {
    @Autowired
    private CategoryImp categoryImp;

    public CategoryController(@Autowired CategoryImp cate) {
        this.categoryImp = cate;
    }

    @GetMapping("/get")
    public ResponseEntity<?> getCategories() {
        // Trả về tất cả thể loại có trong database
        // findAll

        return ResponseEntity.ok(categoryImp.getAll());
    }

    // ROLE: Manager
    @PostMapping("/add")
    public ResponseEntity<?> addCategory(@RequestBody CreateCategoryRequest data) {

        Category category = new Category();

        category.setName(data.getName());
        category.setDescription(data.getDescription());

        System.out.println("name:" + data.getName());
        System.out.println( "mota: "+ data.getDescription());

        // categoryImp.save(category);
        return ResponseEntity.ok(data);
    }

    // ROLE: ManagercategoryId
    @PutMapping("/update/{categoryId}")
    public ResponseEntity<?> editCategory(@PathVariable("categoryId") int categoryId,
            @RequestBody CreateCategoryRequest update) {

        // Kiểm tra categoryId hợp lệ
        if (categoryId <= 0) {
            return ResponseEntity.badRequest().body("Invalid categoryId");
        }

        // Kiểm tra update có giá trị hợp lệ
        if (update == null || update.getName() == null || update.getDescription() == null) {
            return ResponseEntity.badRequest().body("Invalid input data");
        }

        Optional<Category> optionalCategory = categoryImp.findById(categoryId);

        if (optionalCategory.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Category category = optionalCategory.get();

        // Kiểm tra tính hợp lệ của categoryImp
        if (categoryImp == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }

        // Kiểm tra tính hợp lệ của đối tượng Category
        if (category == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }

        category.setName(update.getName());
        category.setDescription(update.getDescription());

        categoryImp.save(category);

        return ResponseEntity.ok("ok");
    }

    // ROLE: Manager
    @DeleteMapping("/delete/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable("categoryId") int categoryId) {

        Optional<Category> category = categoryImp.findById(categoryId);

        if (!category.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        categoryImp.delete(categoryId);

        return ResponseEntity.ok("ok");
    }
}
