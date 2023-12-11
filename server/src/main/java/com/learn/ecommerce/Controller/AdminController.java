package com.learn.ecommerce.Controller;

import com.learn.ecommerce.DTO.TopBrandDTO;
import com.learn.ecommerce.DTO.TopProductDTO;
import com.learn.ecommerce.DTO.TopUserDTO;
import com.learn.ecommerce.Entity.OrderLine;
import com.learn.ecommerce.Entity.Product;
import com.learn.ecommerce.Repository.OrderLineReponsitory;
import com.learn.ecommerce.Service.OrderService;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    @Data
    @AllArgsConstructor
    public static class DateRange {
        public Date startDate;
        public Date endDate;
    }
    @Autowired
    private OrderService orderService;
    @PostMapping ("/statistic-product")
    public ResponseEntity<List<TopProductDTO>> getTopSalesProduct(@RequestBody (required = false) DateRange dateRange){
      Date startDate;
      Date endDate;
      if(dateRange == null){
          startDate = new Date(1990-01-01);
          endDate = new Date(System.currentTimeMillis());
      }
      else {
          startDate = dateRange.getStartDate();
          endDate = dateRange.getEndDate();
      }
      List<TopProductDTO> products = orderService.findTopSellingProducts(startDate,endDate);
      return ResponseEntity.ok(products);
  }
    @PostMapping ("/statistic-brand")
    public ResponseEntity<List<TopBrandDTO>> getTopBrand(@RequestBody (required = false) DateRange dateRange){
        Date startDate;
        Date endDate;
        if(dateRange == null){
            startDate = new Date(1990-01-01);
            endDate = new Date(System.currentTimeMillis());
        }
        else {
            startDate = dateRange.getStartDate();
            endDate = dateRange.getEndDate();
        }
        List<TopBrandDTO> brands = orderService.findTopBrand(startDate,endDate);
        return ResponseEntity.ok(brands);
    }
    @PostMapping ("/statistic-user")
    public ResponseEntity<List<TopUserDTO>> getTopUser(@RequestBody (required = false) DateRange dateRange){
        Date startDate;
        Date endDate;
        if(dateRange == null){
            startDate = new Date(1990-01-01);
            endDate = new Date(System.currentTimeMillis());
        }
        else {
            startDate = dateRange.getStartDate();
            endDate = dateRange.getEndDate();
        }
        List<TopUserDTO> users = orderService.findTopUser(startDate,endDate);

        return ResponseEntity.ok(users);
    }

}