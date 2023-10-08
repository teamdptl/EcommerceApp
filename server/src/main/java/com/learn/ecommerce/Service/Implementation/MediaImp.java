package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.Media;
import com.learn.ecommerce.Service.MediaService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class MediaImp implements MediaService {
    @Override
    public Optional<Media> FindByID(int id) {
        return Optional.empty();
    }

    @Override
    public Optional<Media> FindByUserName(String userName) {
        return Optional.empty();
    }

    @Override
    public List<Media> GetAll() {
        return null;
    }

    @Override
    public void Save(Media T) {

    }

    @Override
    public void Create() {

    }

    @Override
    public void Delete() {

    }
}
