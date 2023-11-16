package com.learn.ecommerce.Controller;


import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.learn.ecommerce.Entity.Product;
import com.learn.ecommerce.Entity.Review;
import com.learn.ecommerce.Request.CreateReviewRequest;
import com.learn.ecommerce.Response.ErrorResponse;
import com.learn.ecommerce.Response.SuccessResponse;
import com.learn.ecommerce.Response.ReviewListResponse;
import com.learn.ecommerce.Service.Implementation.ProductImp;
import com.learn.ecommerce.Service.Implementation.ReviewImp;
import com.learn.ecommerce.Ultis.AuthUtils;
import com.learn.ecommerce.Ultis.ModelMapperUtils;
import com.learn.ecommerce.user.User;

@RestController
@RequestMapping("/api/v1/review")
public class ReviewController {
    private final ReviewImp reviewImp;
    private final ProductImp productImp;
    @Autowired
    private AuthUtils authUtils;

    ReviewController( @Autowired ReviewImp reviewImp, @Autowired ProductImp productImp){
        this.reviewImp = reviewImp ; 
        this.productImp=productImp;
    }
    
   // Get all reviews of a particular product
    

    @PostMapping("/add/{productId}")
    public ResponseEntity<?> addReview(@PathVariable Integer productId,
                                       @RequestBody CreateReviewRequest data){
        Review review = new Review();
        
        review.setCreateAt(new Date());
        review.setDeleted(false);
        review.setDescription(data.getDescription());
        review.setRate(data.getRate());       
        
        Optional<Product> optionalProduct = productImp.findById(productId);
        if(optionalProduct.isEmpty()){
            return ResponseEntity.badRequest().body("Sản phẩm không tồn tại!");
        }

        review.setProduct(optionalProduct.get());

        Optional<User> optionalUser = authUtils.getCurrentUser();
        if(optionalUser.isEmpty())
            return ResponseEntity.badRequest().body("Đăng nhập để đánh giá sản phẩm!");
        review.setUser(optionalUser.get());
        reviewImp.save(review);
        return ResponseEntity.ok("Ok");
    }

    @GetMapping("/all/{productId}")
    public ResponseEntity<?> getReview(@PathVariable Integer productId){
        // TODO: Trả về danh sách review của product
        // Lưu ý: Cần có thêm dữ liệu current user review nếu người dùng hiện tại đã review (chỉ hiện is_delete = false)
        Optional<Product> p = productImp.findById(productId);        
        System.out.println("Get all review");

        if(p.isEmpty()){
            ErrorResponse errorResponse = new ErrorResponse("Sản phẩm không tồn tại!");
            return ResponseEntity.ok(errorResponse);
        }
        List<Review> listReview = reviewImp.getReviewByProduct(p.get());
        List<ReviewListResponse> listResponses = new ArrayList<>();
        for (Review review : listReview) {
            ReviewListResponse item = ModelMapperUtils.map(review, ReviewListResponse.class);
            listResponses.add(item);
        }
        return ResponseEntity.ok(listResponses);
    }

    @GetMapping("/delete/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable Integer reviewId){
        System.out.println("trong delete nè");
        Optional<User> user = authUtils.getCurrentUser();
        if(user.isEmpty()){
            System.out.println("Vui lòng đăng nhập để xóa đánh giá của bạn!");
            ErrorResponse error = new ErrorResponse("Vui lòng đăng nhập để xóa đánh giá của bạn!");
            return ResponseEntity.ok(error);
        }
        
        int userID = user.get().getId();
        Optional<Review> review = reviewImp.findById(reviewId);
        if(review.isEmpty()){
            System.out.println("Đánh giá không tồn tại!");
            ErrorResponse error = new ErrorResponse("Đánh giá không tồn tại!");
            return ResponseEntity.ok(error);
        }

        System.out.println(userID);
        System.out.println(review.get().getUser().getId());
        if(userID == review.get().getUser().getId()){
            reviewImp.delete(reviewId);
            System.out.println("Xóa thành công nè!");
            SuccessResponse respone = new SuccessResponse("Xóa thành công");
            return ResponseEntity.ok(respone);
        }
        ErrorResponse error = new ErrorResponse("Đánh giá không phải của bạn!");
        return ResponseEntity.ok(error);
    }

    @PostMapping("/update/{reviewId}")
    public ResponseEntity<?> updateReview(@PathVariable Integer reviewId, @RequestBody CreateReviewRequest data){

        Optional<User> user = authUtils.getCurrentUser();
        if(user.isEmpty()){
            return ResponseEntity.badRequest().body("Vui lòng đăng nhập để xóa đánh giá của bạn!");
        }
        
        int userID = user.get().getId();

        Optional<Review> optionalReview = reviewImp.findById(reviewId);
        if(optionalReview.isEmpty())
            return ResponseEntity.badRequest().body("Không tìm thấy đánh giá hợp lệ!");
        Review review = optionalReview.get();
        review.setDescription(data.getDescription());
        review.setRate(data.getRate());
        if(userID == review.getUser().getId()){
            reviewImp.save(review);
            return ResponseEntity.ok("Cập nhật thành công!");
        }
        return ResponseEntity.badRequest().body("Không có quyền để cập nhật");
    }   
}
