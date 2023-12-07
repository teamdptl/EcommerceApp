package com.learn.ecommerce.Controller;

import com.learn.ecommerce.Entity.Media;
import com.learn.ecommerce.Response.MediaResponse;
import com.learn.ecommerce.Service.Implementation.MediaImp;
import com.learn.ecommerce.Ultis.ModelMapperUtils;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/api/v1/upload")
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
    public ResponseEntity<?> uploadFile(@RequestParam List<MultipartFile> files){
        if (files.isEmpty())
            return ResponseEntity.badRequest().build();
        List<MediaResponse> medias = new ArrayList<>();
        for (MultipartFile file : files){
            Media media = mediaImp.saveProductFile(file);
            if (media != null){
                MediaResponse res = ModelMapperUtils.map(media, MediaResponse.class);
                if (res.isExternalImage())
                    res.setImageUrl(res.getImageUrl());
                else {
                    res.setImageUrl(MainController.url+"/"+Media.mediaPath+res.getImageUrl());
                }
                medias.add(res);
            }
        }
        return ResponseEntity.ok(medias);
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
