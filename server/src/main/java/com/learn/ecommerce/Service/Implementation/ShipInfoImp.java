package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.ShipInfo;
import com.learn.ecommerce.Service.ShipInfoService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class ShipInfoImp implements ShipInfoService {
    public Optional<ShipInfo> FindByID(int id) {
        return Optional.empty();
    }

    public Optional<ShipInfo> FindByUserName(String userName) {
        return Optional.empty();
    }

    public List<ShipInfo> GetAll() {
        return null;
    }

    public void Save(ShipInfo T) {

    }

    public void Create() {

    }

    public void Delete() {

    }
}
