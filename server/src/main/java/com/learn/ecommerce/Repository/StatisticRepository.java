package com.learn.ecommerce.Repository;

import com.learn.ecommerce.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface StatisticRepository extends JpaRepository<Order, Integer> {
    @Query("SELECT date(o.createAt) as dateLabel, SUM(o.totalPrice) as totalMoney, COUNT(DISTINCT o.orderId) as totalOrder, SUM(ol.quantity) as totalQuantity" +
            " FROM Order o LEFT JOIN OrderLine ol ON ol.order.orderId = o.orderId WHERE (o.createAt BETWEEN :fromDate AND :toDate) AND o.isDeleted = false " +
            "GROUP BY dateLabel ORDER BY date(o.createAt) asc")
    List<OrderChartQuery> findStatisticChart(@Param("fromDate") Date fromDate, @Param("toDate") Date toDate);

    @Query("SELECT weekday(o.createAt) as dayOfWeek, SUM(o.totalPrice) as totalMoney, COUNT(DISTINCT o.orderId) as totalOrder, SUM(ol.quantity) as totalQuantity " +
            "FROM Order o LEFT JOIN OrderLine ol ON o.orderId = ol.order.orderId" +
            " WHERE (o.createAt BETWEEN :fromDate AND :toDate) AND o.isDeleted = false GROUP BY dayOfWeek ORDER BY weekday(o.createAt) ASC")
    List<OrderWeekdayQuery> findStatisticWeekdayChart(@Param("fromDate") Date fromDate, @Param("toDate") Date toDate);
}
