package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.User;
import com.learn.ecommerce.Service.UserService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class UserImp implements UserService {
    @Override
    public Optional<User> FindByID(int id) {
        return Optional.empty();
    }

    @Override
    public Optional<User> FindByUserName(String userName) {
        return Optional.empty();
    }

    @Override
    public List<User> GetAll() {
        return null;
    }

    @Override
    public void Save(User T) {

    }

    @Override
    public void Create() {

    }

    @Override
    public void Delete() {

    }
}
