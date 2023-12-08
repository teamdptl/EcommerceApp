package com.learn.ecommerce.Controller;

import com.itextpdf.text.DocumentException;
import com.learn.ecommerce.Entity.Order;
import com.learn.ecommerce.Request.PlaceOrderRequest;
import com.learn.ecommerce.Response.ErrorResponse;
import com.learn.ecommerce.Response.OrderResponse;
import com.learn.ecommerce.Service.Implementation.EmailServiceImpl;
import com.learn.ecommerce.Service.Implementation.OrderImp;
import com.learn.ecommerce.Ultis.ModelMapperUtils;

import java.io.FileNotFoundException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.sql.Date;
import java.util.List;

import com.learn.ecommerce.Entity.Product;
import com.learn.ecommerce.Entity.ShipInfo;
import com.learn.ecommerce.Entity.User;
import com.learn.ecommerce.Request.PlaceOrderItem;
import com.learn.ecommerce.Request.PlaceOrderRequest;
import com.learn.ecommerce.Response.ErrorResponse;
import com.learn.ecommerce.Response.SuccessResponse;
import com.learn.ecommerce.Service.Implementation.OrderImp;
import com.learn.ecommerce.Service.Implementation.ShipInfoImp;
import com.learn.ecommerce.Ultis.AuthUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/v1/order")
public class OrderController {
    @Autowired
    private ShipInfoImp shipInfoImp;
    @Autowired
    private AuthUtils auth;

    @Autowired
    private EmailServiceImpl emailServiceImp;

    private final OrderImp orderImp;
    OrderController( @Autowired OrderImp orderImp ){
        this.orderImp = orderImp;
    }

    // ROLE: User
    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@Valid @RequestBody PlaceOrderRequest request, BindingResult result){
        if (result.hasErrors()){
            return ResponseEntity.badRequest().body(new ErrorResponse("Dữ liệu " + result.getFieldError().getField() + " không hợp lệ!"));
        }
        Optional<ShipInfo> shipInfo = shipInfoImp.findShipInfoById(request.getShipId());
        if (!shipInfo.isPresent())
            return ResponseEntity.badRequest().body(new ErrorResponse("Thông tin nhận hàng không tồn tại!"));

        Optional<User> optionalUser = auth.getCurrentUser();
        Order order = new Order();
        order.setPaymentMethod(request.getPaymentType());
        order.setCreateAt(new Timestamp(System.currentTimeMillis()));
        order.setShipInfo(shipInfo.get());
        order.setUser(optionalUser.orElse(null));
        String coupon = "";
        try {
            Order saved = orderImp.placeOrder(Arrays.asList(request.getItems()), order, coupon);

            CompletableFuture.runAsync(() -> {
                try {
                    orderImp.generatePdfContent(saved);
                } catch (FileNotFoundException e) {
                    throw new RuntimeException(e);
                } catch (DocumentException e) {
                    throw new RuntimeException(e);
                }

//                emailServiceImp.sendEmailAsync(optionalUser.get().getEmail(), "Xác nhận đơn hàng", pdfContent);
            });

            return ResponseEntity.ok(new SuccessResponse("Tạo đơn hàng thành công"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }


    // ROLE: User
    @GetMapping("/user-orders")
    public ResponseEntity<?> getUserOrders(){
        return ResponseEntity.ok("ok");
    }

    // ROLE: Admin
   @GetMapping("/all")
   public ResponseEntity<?> getAllOrders(@RequestParam(value = "text", required = false, defaultValue = "") String text,
                                            @RequestParam(value = "start", required = false, defaultValue = "") String time_start, 
                                            @RequestParam(value = "end", required = false, defaultValue = "") String time_end,
                                            @RequestParam(value = "status" , required = false) Integer status){
        Date start = time_start.equals("") ? Date.valueOf("1970-01-01") : Date.valueOf(time_start);
        Date end = time_end.equals("") ? Date.valueOf(LocalDate.now()) : Date.valueOf(time_end);
        Integer isAllStatus = 0;
        if(status == null){
            status = 0;
            isAllStatus = 1;
        }

        System.out.println(text);        
        System.out.println(start);
        System.out.println(end);
        System.out.println(status);

        List<Order> listOrders = orderImp.getFilterOrders(start, end, status, isAllStatus);
        if(!listOrders.isEmpty()){
            List<OrderResponse> listResult = new ArrayList<>();
            for (Order order : listOrders) {
                listResult.add(ModelMapperUtils.map(order, OrderResponse.class));
            }
            return ResponseEntity.ok(listResult);
        }
        return ResponseEntity.ok(new ErrorResponse("Không tìm thấy dữ liệu!"));
   }


}
