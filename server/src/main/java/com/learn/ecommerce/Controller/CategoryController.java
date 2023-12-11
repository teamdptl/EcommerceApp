package com.learn.ecommerce.Controller;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.learn.ecommerce.Entity.Category;
import com.learn.ecommerce.Request.CreateCategoryRequest;
import com.learn.ecommerce.Response.ErrorResponse;
import com.learn.ecommerce.Service.Implementation.CategoryImp;
import com.learn.ecommerce.Ultis.ModelMapperUtils;

import ch.qos.logback.core.joran.util.beans.BeanUtil;
import io.micrometer.common.lang.Nullable;
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
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<?> addCategory(@RequestBody CreateCategoryRequest data) {

        // Kiểm tra dữ liệu đầu vào
        if (data == null || data.getName() == null || data.getName().isEmpty()) {
            return ResponseEntity.badRequest().body("Name is required");
        }

        // Kiểm tra sự tồn tại của danh mục trước khi thêm mới
        if (categoryImp.existsByName(data.getName())) {
            return ResponseEntity.badRequest().body("Category with this name already exists");
        }

        Category category = new Category();

        category.setName(data.getName());
        category.setDescription(data.getDescription());

        try {
            categoryImp.save(category);
            return ResponseEntity.ok(category);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving category");
        }
    }

    // ROLE: ManagercategoryId
    @PreAuthorize("hasRole('ADMIN')")
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

        return ResponseEntity.ok(category);
    }

    // ROLE: Manager
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable("categoryId") int categoryId) {

        Optional<Category> category = categoryImp.findById(categoryId);
        System.out.println(category);
        if (!category.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        categoryImp.delete(categoryId);

        return ResponseEntity.ok("ok");
    }
}
