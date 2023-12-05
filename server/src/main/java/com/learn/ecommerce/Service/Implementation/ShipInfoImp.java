package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.ShipInfo;
import com.learn.ecommerce.Repository.ShipInfoReponsitory;
import com.learn.ecommerce.Service.ShipInfoService;
import com.learn.ecommerce.Service.UserService;
import lombok.Getter;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Getter
@Component
public class ShipInfoImp implements ShipInfoService {

    private final ShipInfoReponsitory repository;

    private final UserService userService;

    public ShipInfoImp(ShipInfoReponsitory reponsitory, UserService userService) {
        this.repository = reponsitory;
        this.userService = userService;
    }

    @Override
    public List<ShipInfo> findByUserId(int userId) {
        return repository.findByUserId(userId);
    }

    @Override
    public ShipInfo addShipInfo(ShipInfo shipInfo) {
        return repository.save(shipInfo);
    }
    @Override
    public boolean deleteShipInfo(int shipId) {
        Optional<ShipInfo> optionalShipInfo = repository.findById(shipId);

        if (optionalShipInfo.isPresent()) {
            ShipInfo shipInfo = optionalShipInfo.get();
            shipInfo.setDeleted(true);
            repository.save(shipInfo);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Optional<ShipInfo> findShipInfoById(int shipId) {
        return repository.findById(shipId);
    }

    @Override
    public ShipInfo updateShipInfo(ShipInfo shipInfo) {
        return repository.save(shipInfo);
    }

    public Optional<ShipInfo> getShipInfoById(int id) {
        return repository.findById(id);
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
