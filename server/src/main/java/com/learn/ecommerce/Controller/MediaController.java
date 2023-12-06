package com.learn.ecommerce.Controller;

import com.learn.ecommerce.Entity.Media;
import com.learn.ecommerce.Service.Implementation.MediaImp;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

@Controller
@RequestMapping("/upload")
public class MediaController {
    private final MediaImp mediaImp;
    public MediaController(@Autowired MediaImp mediaImp) {
        this.mediaImp = mediaImp;
    }

    @GetMapping("/photo/{src}")
    public @ResponseBody ResponseEntity<InputStreamResource> getFile(@PathVariable String src) throws IOException {
        Optional<Media> media =  mediaImp.getMediaByUrl(src);
        if (media.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        String pathUrl = System.getProperty("user.dir") + "/" + Media.mediaPath + media.get().getImageUrl();
        try {
            File file = new File(pathUrl);
            MediaType mediaType = getImageMediaType(file.getName());
            InputStream inputStream = new FileInputStream(file);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(mediaType);
            headers.setContentLength(file.length());
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(new InputStreamResource(inputStream));
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/photo")
    public ResponseEntity<?> uploadFile(MultipartFile file){
        Media media = mediaImp.saveProductFile(file);
        if (media != null){
            return ResponseEntity.ok(media);
        }
        return ResponseEntity.badRequest().build();
    }

    private MediaType getImageMediaType(String fileName) {
        String fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
        switch (fileExtension) {
            case "jpg":
            case "jpeg":
                return MediaType.IMAGE_JPEG;
            case "png":
                return MediaType.IMAGE_PNG;
            case "gif":
                return MediaType.IMAGE_GIF;
            case "mp4":
                return MediaType.valueOf("video/mp4");
            default:
                return MediaType.IMAGE_JPEG;
        }
    }

}
