package com.learn.ecommerce.Controller;

import com.learn.ecommerce.Entity.*;
import com.learn.ecommerce.Request.PlaceOrderRequest;
import com.learn.ecommerce.Response.*;
import com.learn.ecommerce.Service.Implementation.*;
import com.itextpdf.text.DocumentException;
import com.learn.ecommerce.Entity.Order;
import com.learn.ecommerce.Response.ErrorResponse;
import com.learn.ecommerce.Response.OrderResponse;
import com.learn.ecommerce.Service.EmailService;
import com.learn.ecommerce.Service.Implementation.OrderImp;
import com.learn.ecommerce.Ultis.ModelMapperUtils;

import java.io.FileNotFoundException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.sql.Date;
import java.util.List;

import com.learn.ecommerce.Request.PlaceOrderItem;
import com.learn.ecommerce.Ultis.AuthUtils;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Arrays;
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
    private OrderImp orderImp;
    @Autowired
    private OrderLineImp orderLineImp;
    @Autowired
    private MediaImp mediaImp;

    @Autowired
    private EmailService emailServiceImp;

    // ROLE: User
    @PreAuthorize("hasRole('USER')")
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

                    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                    String currentDateTime = dateFormat.format(new java.util.Date());

                    orderImp.generatePdfContent(saved, currentDateTime, optionalUser);

//                    try {
//                        System.out.println("Email: " + optionalUser.get().getEmail());
//                        emailServiceImp.sendEmailWithAttachment(optionalUser.get().getEmail(), "Xác nhận đơn hàng", "Chúc mừng bạn đã đặt đơn hàng thành công, đây là file đính kèm của đơn đặt hàng", "D:\\PDF"+currentDateTime+".pdf");
//                    } catch (MessagingException e) {
//                        throw new RuntimeException(e);
//                    }

                } catch (FileNotFoundException e) {
                    throw new RuntimeException(e);
                } catch (DocumentException e) {
                    throw new RuntimeException(e);
                }

            });

            return ResponseEntity.ok(new SuccessResponse("Tạo đơn hàng thành công"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('USER')")// ROLE: User
    @GetMapping("/user-orders")
    public ResponseEntity<?> getUserOrders(){
        return ResponseEntity.ok("ok");
    }


    @PreAuthorize("hasRole('ADMIN')")// ROLE: Admin
   @GetMapping("/all")
   public ResponseEntity<?> getAllOrders(@RequestParam(value = "text", required = false, defaultValue = "") String text,
                                            @RequestParam(value = "start", required = false, defaultValue = "") String time_start, 
                                            @RequestParam(value = "end", required = false, defaultValue = "") String time_end,
                                            @RequestParam(value = "status" , required = false) Integer status){
        Date start = time_start.equals("") ? Date.valueOf("1970-01-01") : Date.valueOf(time_start);
        Date end = time_end.equals("") ? Date.valueOf(LocalDate.now()) : Date.valueOf(time_end);
        Integer isAllStatus = 0;
        if(status == null || status == 0){
            status = 0;
            isAllStatus = 1;
        }

        System.out.println(text);        
        System.out.println(start);
        System.out.println(end);
        System.out.println(status);
        System.out.println(isAllStatus);

        List<Order> listOrders = orderImp.getFilterOrders(text, start, end, status, isAllStatus);
        if(!listOrders.isEmpty()){
            List<OrderResponse> listResult = new ArrayList<>();
            List<OrderLineResponse> listProduct = new ArrayList<>();
            OrderResponse orderResponse;
            OrderLineResponse orderLineResponse;
            MediaResponse mediaResponse;
            for (Order order : listOrders) {
                List<OrderLine> listOrderLine = orderLineImp.getAllOrderLines(order.getOrderId());
                System.out.println("Tìm thấy danh sách đơn hàng!");
                if(!listOrderLine.isEmpty()){
                    System.out.println("Tìm thấy danh sách sản phẩm của đơn hàng!");
                    for (OrderLine orderLine : listOrderLine) {
                        orderLineResponse = ModelMapperUtils.map(orderLine, OrderLineResponse.class);
                        Optional<Media> media = mediaImp.getProductPrimaryMedia(orderLine.getProduct().getProductId());
                        mediaResponse = ModelMapperUtils.map(media.orElse(null), MediaResponse.class);
                        orderLineResponse.setProductMedia(mediaResponse);
                        listProduct.add(orderLineResponse);

                    }
                }else{
//                    return ResponseEntity.ok(new ErrorResponse("Không tìm thấy dữ liệu!"));
                }
                System.out.println(listProduct.size());
                orderResponse = ModelMapperUtils.map(order, OrderResponse.class);
                orderResponse.setOrderLineResponse(listProduct.stream().toList());
                listResult.add(orderResponse);
                listProduct.clear();
            }
            return ResponseEntity.ok(listResult);
        }
        return ResponseEntity.ok(new ErrorResponse("Không tìm thấy dữ liệu!"));
   }

   @GetMapping("/update/status")
   public ResponseEntity<?> updateOrderStatus(@RequestParam(name = "order") Integer orderId,
                                              @RequestParam(name = "status") Integer orderStatus){
       System.out.println(orderId);
       System.out.println(orderStatus);
        Optional<Order> orderOptional = orderImp.findById(orderId);
        if(orderOptional.isEmpty())
            return ResponseEntity.ok(new ErrorResponse("Không tìm thấy sản phẩm hợp lệ"));
        Order order = orderOptional.get();
        order.setOrderStatus(orderStatus);
        orderImp.save(order);
        return ResponseEntity.ok(new SuccessResponse("Cập nhật trạng thái thành công"));
   }

   @GetMapping("/update/payment")
    public ResponseEntity<?> updatePaymentStatus(@RequestParam(name = "order") Integer orderId,
                                                 @RequestParam(name = "payment") Boolean paymentStatus){
       System.out.println(orderId);
       System.out.println(paymentStatus);
       Optional<Order> orderOptional = orderImp.findById(orderId);
       if(orderOptional.isEmpty())
           return ResponseEntity.ok(new ErrorResponse("Không tìm thấy hóa đơn hợp lệ"));
       Order order = orderOptional.get();
       order.setPaymentStatus(paymentStatus);
       orderImp.save(order);
       return ResponseEntity.ok(new SuccessResponse("Cập nhật trạng thái thành công"));
   }


}
