package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.Branch;
import com.learn.ecommerce.Service.BranchService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class BranchImp implements BranchService {
    @Override
    public Optional<Branch> FindByID(int id) {
        return Optional.empty();
    }

    @Override
    public Optional<Branch> FindByUserName(String userName) {
        return Optional.empty();
    }

    @Override
    public List<Branch> GetAll() {
        return null;
    }

    @Override
    public void Save(Branch T) {

    }

    @Override
    public void Create() {

    }

    @Override
    public void Delete() {

    }
}
