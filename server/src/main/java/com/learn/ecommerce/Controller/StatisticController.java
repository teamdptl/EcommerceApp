package com.learn.ecommerce.Controller;

import com.learn.ecommerce.Repository.OrderChartQuery;
import com.learn.ecommerce.Repository.OrderWeekdayQuery;
import com.learn.ecommerce.Service.Implementation.StatisticImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/statistic")
@PreAuthorize("hasRole('ADMIN')")

public class StatisticController {
    @Autowired
    private StatisticImp services;
    @GetMapping("/chart")
    public ResponseEntity<?> getStatisticChartByTime(@RequestParam Long fromDate, @RequestParam Long toDate){
        Date from = new Date(fromDate);
        Date to = new Date(toDate);
        List<OrderChartQuery> orders = services.getStatisticChart(from, to);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/weekly")
    public ResponseEntity<?> getStatisticWeekly(@RequestParam Long fromDate, @RequestParam Long toDate){
        Date from = new Date(fromDate);
        Date to = new Date(toDate);
        List<OrderWeekdayQuery> orders = services.getWeekdayStatisticChart(from, to);
        return ResponseEntity.ok(orders);
    }
}
