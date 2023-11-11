package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.OrderCoupon;
import com.learn.ecommerce.Service.OrderCouponService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class OrderCouponImp implements OrderCouponService {
    public Optional<OrderCoupon> FindByID(int id) {
        return Optional.empty();
    }

    public Optional<OrderCoupon> FindByUserName(String userName) {
        return Optional.empty();
    }

    public List<OrderCoupon> GetAll() {
        return null;
    }

    public void Save(OrderCoupon T) {

    }

    public void Create() {

    }

    public void Delete() {

    }
}
