package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.Coupon;
import com.learn.ecommerce.Service.CouponService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class CouponImp implements CouponService {
    @Override
    public Optional<Coupon> FindByID(int id) {
        return Optional.empty();
    }

    @Override
    public Optional<Coupon> FindByUserName(String userName) {
        return Optional.empty();
    }

    @Override
    public List<Coupon> GetAll() {
        return null;
    }

    @Override
    public void Save(Coupon T) {

    }

    @Override
    public void Create() {

    }

    @Override
    public void Delete() {

    }
}
