 package com.learn.ecommerce.Service;
import com.learn.ecommerce.DTO.TopBrandDTO;
import com.learn.ecommerce.DTO.TopProductDTO;
import com.learn.ecommerce.DTO.TopUserDTO;
import org.springframework.stereotype.Service;
 import com.learn.ecommerce.Entity.Order;

import java.sql.Date;
import java.util.List;

 @Service
 public interface OrderService extends RootService<Order, Integer> {

  List<TopProductDTO> findTopSellingProducts(Date startDate, Date endDate);

  List<TopBrandDTO> findTopBrand(Date startDate, Date endDate);

  List<TopUserDTO> findTopUser(Date startDate, Date endDate);
 }