package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.OrderCoupon;
import com.learn.ecommerce.Service.OrderCouponService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class OrderCouponImp implements OrderCouponService {
    @Override
    public Optional<OrderCoupon> FindByID(int id) {
        return Optional.empty();
    }

    @Override
    public Optional<OrderCoupon> FindByUserName(String userName) {
        return Optional.empty();
    }

    @Override
    public List<OrderCoupon> GetAll() {
        return null;
    }

    @Override
    public void Save(OrderCoupon T) {

    }

    @Override
    public void Create() {

    }

    @Override
    public void Delete() {

    }
}
