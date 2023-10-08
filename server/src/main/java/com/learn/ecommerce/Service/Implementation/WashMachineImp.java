package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.WashMachine;
import com.learn.ecommerce.Service.WashMachineService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class WashMachineImp implements WashMachineService {
    @Override
    public Optional<WashMachine> FindByID(int id) {
        return Optional.empty();
    }

    @Override
    public Optional<WashMachine> FindByUserName(String userName) {
        return Optional.empty();
    }

    @Override
    public List<WashMachine> GetAll() {
        return null;
    }

    @Override
    public void Save(WashMachine T) {

    }

    @Override
    public void Create() {

    }

    @Override
    public void Delete() {

    }
}
