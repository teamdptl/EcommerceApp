package com.learn.ecommerce.Service;
import com.learn.ecommerce.Entity.Product;
import org.springframework.stereotype.Service;
 import com.learn.ecommerce.Entity.Media;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
 public interface MediaService extends RootService<Media, Integer> {

    Media saveProductFile(MultipartFile file);

    void saveFiles(List<Integer> files, Product product, Integer primary);

}