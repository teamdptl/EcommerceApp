package com.learn.ecommerce.Controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    public static String url = "http://localhost:8080";
    @GetMapping(value = "/", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<Resource> index() {
        try {
            Resource resource = new ClassPathResource("static/index.html");
            return ResponseEntity.ok(resource);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
