package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.Coupon;
import com.learn.ecommerce.Service.CouponService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class CouponImp implements CouponService {
    public Optional<Coupon> FindByID(int id) {
        return Optional.empty();
    }

    public Optional<Coupon> FindByUserName(String userName) {
        return Optional.empty();
    }

    public List<Coupon> GetAll() {
        return null;
    }

    public void Save(Coupon T) {

    }

    public void Create() {

    }

    public void Delete() {

    }
}
