package com.learn.ecommerce.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {
    @GetMapping("/get")
    public ResponseEntity<?> getCategories(){
        // Trả về tất cả thể loại có trong database
        // findAll
        return null;
    }

    // ROLE: Manager
    @PostMapping("/add")
    public ResponseEntity<?> addCategory(@RequestPart String name, @RequestPart String description){
        return null;
    }

    // ROLE: Manager
    @PutMapping("/update")
    public ResponseEntity<?> addCategory(@RequestPart Integer id, @RequestPart String name, @RequestPart String description){
        return null;
    }

    // ROLE: Manager
    @DeleteMapping("/delete/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable String categoryId){
        return null;
    }
}
