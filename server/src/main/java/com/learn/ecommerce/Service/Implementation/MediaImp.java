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
import java.util.Set;
import java.util.UUID;

@Component
public class MediaImp implements MediaService {

    @Autowired
    private MediaRepository repository;

    private final String filePath = "upload/product/";

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
    public void saveProductFile(MultipartFile file, Product p) {
        saveProductFile(file, p, false);
    }

    @Override
    public void saveFiles(List<MultipartFile> files, Product p) {
        for (MultipartFile file: files) {
            this.saveProductFile(file, p);
        }
    }

    @Override
    public void saveProductFile(MultipartFile file, Product p, boolean isPrimary) {
        try {
            String fileName = filePath + UUID.randomUUID() + file.getOriginalFilename();
            Path path = Paths.get(fileName);
            Files.createDirectories(path.getParent());

            FileCopyUtils.copy(file.getBytes(), path.toFile());

            Media media = new Media();
            media.setImageUrl(fileName);
            media.setProduct(p);
            media.setPrimary(isPrimary);
            repository.save(media);
        } catch (Exception ex){
            System.out.println(ex.toString());
        }
    }

    @Override
    public void saveFiles(List<MultipartFile> files, Product product, Integer primary) {
        int index = 0;
        for (MultipartFile file: files){
            this.saveProductFile(file, product, index == primary);
            index ++;
        }
    }

    public void removeMediaFromProduct(Product product, Integer[] ids){
        for (int id : ids){
            Optional<Media> media = repository.findById(id);
            if (media.isPresent() && media.get().getProduct().getProductId() == product.getProductId()){
                repository.delete(media.get());
            }
        }
    }
}
