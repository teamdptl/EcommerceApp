package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.Media;
import com.learn.ecommerce.Entity.Product;
import com.learn.ecommerce.Repository.MediaRepository;
import com.learn.ecommerce.Service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class MediaImp implements MediaService {

    @Autowired
    private MediaRepository repository;

    private final String filePath = Media.mediaPath;

    @Override
    public Optional<Media> findById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public List<Media> getAll() {
        return repository.findAll();
    }

    @Override
    public void save(Media T) {
        repository.save(T);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }


    @Override
    public void saveFiles(List<Integer> fileIds, Product p, Integer primary) {
        List<Integer> currentIds = new java.util.ArrayList<>(getMediasByProduct(p).stream().map(Media::getImageId).toList());
        currentIds.removeAll(fileIds);
        removeMedia(currentIds);
        boolean isExistPrimary = false;
        Media firstMedia = null;
        for (Integer id: fileIds) {
            Optional<Media> media = repository.findById(id);
            if (media.isPresent()){
                Media m = media.get();
                firstMedia = m;
                if (primary.equals(id)){
                    m.setPrimary(true);
                    isExistPrimary = true;
                }
                else {
                    m.setPrimary(false);
                }
                m.setProduct(p);
                repository.save(m);
            }
        }
        if (!isExistPrimary && firstMedia != null)
            firstMedia.setPrimary(true);
    }

    @Override
    public Media saveProductFile(MultipartFile file) {
        try {
            String fileName =  UUID.randomUUID() + file.getOriginalFilename();
            Path path = Paths.get(filePath + fileName);
            Files.createDirectories(path.getParent());

            FileCopyUtils.copy(file.getBytes(), path.toFile());

            Media media = new Media();
            media.setImageUrl(fileName);
            media.setProduct(null);
            media.setPrimary(false);
            return repository.save(media);
        } catch (Exception ex){
            System.out.println(ex.toString());
        }
        return null;
    }

    public void removeMedia(List<Integer> removeIds){
        for (int id : removeIds){
            Optional<Media> media = repository.findById(id);
            media.ifPresent(value -> repository.delete(value));
        }
    }

    public Optional<Media> getProductPrimaryMedia(Integer productId){
        return repository.findByProductPrimary(productId);
    }

    public List<Media> getMediasByProduct(Product product){
        return repository.findByProduct(product);
    }

    public Optional<Media> getMediaByUrl(String url){
        return repository.findByImageUrl(url);
    }
}
