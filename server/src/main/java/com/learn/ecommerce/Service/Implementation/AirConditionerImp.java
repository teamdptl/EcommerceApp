package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.AirConditioner;
import com.learn.ecommerce.Service.AirConditionerService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class AirConditionerImp implements AirConditionerService {
    @Override
    public Optional<AirConditioner> FindByID(int id) {
        return Optional.empty();
    }

    @Override
    public Optional<AirConditioner> FindByUserName(String userName) {
        return Optional.empty();
    }

    @Override
    public List<AirConditioner> GetAll() {
        return null;
    }

    @Override
    public void Save(AirConditioner T) {

    }

    @Override
    public void Create() {

    }

    @Override
    public void Delete() {

    }
}
