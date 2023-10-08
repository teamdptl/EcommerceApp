package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.ShipInfo;
import com.learn.ecommerce.Service.ShipInfoService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class ShipInfoImp implements ShipInfoService {
    @Override
    public Optional<ShipInfo> FindByID(int id) {
        return Optional.empty();
    }

    @Override
    public Optional<ShipInfo> FindByUserName(String userName) {
        return Optional.empty();
    }

    @Override
    public List<ShipInfo> GetAll() {
        return null;
    }

    @Override
    public void Save(ShipInfo T) {

    }

    @Override
    public void Create() {

    }

    @Override
    public void Delete() {

    }
}
