package com.learn.ecommerce.Controller;

import com.learn.ecommerce.Entity.Order;
import com.learn.ecommerce.Request.PlaceOrderRequest;
import com.learn.ecommerce.Response.ErrorResponse;
import com.learn.ecommerce.Response.OrderResponse;
import com.learn.ecommerce.Service.Implementation.OrderImp;
import com.learn.ecommerce.Ultis.ModelMapperUtils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/order")
public class OrderController {

    private final OrderImp orderImp;
    OrderController( @Autowired OrderImp orderImp ){
        this.orderImp = orderImp;
    }

    // ROLE: User
    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody PlaceOrderRequest request){
        return ResponseEntity.ok(request);
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
