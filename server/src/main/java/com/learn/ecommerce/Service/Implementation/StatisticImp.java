package com.learn.ecommerce.Service.Implementation;

import com.learn.ecommerce.Repository.OrderChartQuery;
import com.learn.ecommerce.Repository.OrderWeekdayQuery;
import com.learn.ecommerce.Repository.StatisticRepository;
import com.learn.ecommerce.Service.StatisticService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
@AllArgsConstructor
public class StatisticImp implements StatisticService {
    private StatisticRepository repo;

    @Override
    public List<OrderChartQuery> getStatisticChart(Date fromDate, Date toDate){
        return repo.findStatisticChart(fromDate, toDate);
    }

    @Override
    public List<OrderWeekdayQuery> getWeekdayStatisticChart(Date fromDate, Date toDate){
        return repo.findStatisticWeekdayChart(fromDate, toDate);
    }
}
