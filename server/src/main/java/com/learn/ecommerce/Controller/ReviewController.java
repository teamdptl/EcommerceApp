package com.learn.ecommerce.Controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/review")
public class ReviewController {
    @PostMapping("/add/{productId}")
    public ResponseEntity<?> addReview(@PathVariable Integer productId,
                                       @RequestPart String description,
                                       @RequestPart Integer rate){
        // TODO: Thực hiện tạo review cho product, kiếm tra xem user hiện tại đã review hay chưa
        return ResponseEntity.ok("Ok");
    }

    @GetMapping("/all/{productId}")
    public ResponseEntity<?> getReview(@PathVariable Integer productId){
        // TODO: Trả về danh sách review của product
        // Lưu ý: Cần có thêm dữ liệu current user review nếu người dùng hiện tại đã review (chỉ hiện is_delete = false)
        return ResponseEntity.ok("Ok");
    }

    @DeleteMapping("/delete/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable Integer reviewId){
        // TODO: Thực hiện xóa review của product, chỉ xóa được cái của mình
        return ResponseEntity.ok("OK");
    }
}
