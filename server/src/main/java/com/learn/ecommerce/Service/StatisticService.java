package com.learn.ecommerce.Service;

import com.learn.ecommerce.Repository.OrderChartQuery;
import com.learn.ecommerce.Repository.OrderWeekdayQuery;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public interface StatisticService {
    List<OrderChartQuery> getStatisticChart(Date fromDate, Date toDate);

    List<OrderWeekdayQuery> getWeekdayStatisticChart(Date fromDate, Date toDate);
}
