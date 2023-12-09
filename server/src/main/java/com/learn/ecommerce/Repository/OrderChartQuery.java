package com.learn.ecommerce.Repository;

import java.util.Date;


public interface OrderChartQuery {
    Date getDateLabel();
    Long getTotalMoney();
    Long getTotalOrder();
    Long getTotalQuantity();
}
