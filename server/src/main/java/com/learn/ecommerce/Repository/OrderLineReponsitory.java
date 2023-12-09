 package com.learn.ecommerce.Repository;
import com.learn.ecommerce.Entity.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

 @Repository
 public interface OrderLineReponsitory extends JpaRepository<OrderLine,Integer>{

  @Query("SELECT ol FROM Media m, OrderLine ol WHERE ol.order.orderId = :orderId")
  List<OrderLine> getAllOrderLines(@Param(value = "orderId") Integer orderId);
}
