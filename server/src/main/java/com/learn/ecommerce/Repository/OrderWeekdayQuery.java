package com.learn.ecommerce.Repository;

public interface OrderWeekdayQuery {
    Integer getDayOfWeek();
    Long getTotalMoney();
    Long getTotalOrder();
    Long getTotalQuantity();
}
