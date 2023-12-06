package com.learn.ecommerce.Service;
import com.learn.ecommerce.Entity.Product;
import org.springframework.stereotype.Service;
 import com.learn.ecommerce.Entity.Media;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
 public interface MediaService extends RootService<Media, Integer> {
    public void saveProductFile(MultipartFile file, Product p);
    public void saveFiles(List<MultipartFile> file, Product p);

    void saveProductFile(MultipartFile file, Product p, boolean isPrimary);

    Media saveProductFile(MultipartFile file);

    void saveFiles(List<MultipartFile> files, Product product, Integer primary);
}