 package com.learn.ecommerce.Repository;
import com.learn.ecommerce.Entity.Order;

import java.sql.Date;
import java.util.List;

import com.learn.ecommerce.Entity.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

 @Repository   
 public interface OrderReponsitory extends JpaRepository<Order,Integer>{


     @Query("SELECT o FROM Order o WHERE (:text = '' or (:text != '' and (o.shipInfo.fullName like %:text% or o.shipInfo.phone = :text))) and o.createAt >= :start and o.createAt <= :end and (o.orderStatus = :status or 1 = :isAllStatus) and o.isDeleted = false")
     List<Order> getFilterOrders(@Param("text") String text, @Param("start") Date start, @Param("end") Date end, @Param("status") Integer status, @Param("isAllStatus") Integer isAllStatus);

     @Query("SELECT o FROM Order o WHERE o.orderId = :text and o.createAt >= :start and o.createAt <= :end and (o.orderStatus = :status or 1 = :isAllStatus) and o.isDeleted = false")
     List<Order> getFilterOrders(@Param("text") Integer text, @Param("start") Date start, @Param("end") Date end, @Param("status") Integer status, @Param("isAllStatus") Integer isAllStatus);


 }