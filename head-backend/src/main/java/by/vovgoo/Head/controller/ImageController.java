package by.vovgoo.Head.controller;

import by.vovgoo.Head.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@RestController
@RequestMapping("/api/v1/images/")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            imageService.uploadImage(file);
            return ResponseEntity.ok("Image uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error uploading image");
        }
    }

    @GetMapping("/{imageName}")
    public ResponseEntity<InputStreamResource> getImage(@PathVariable String imageName) {
        try {
            byte[] image = imageService.getImage(imageName);
            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(image);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + imageName)
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(new InputStreamResource(byteArrayInputStream));
        } catch (IOException e) {
            return ResponseEntity.status(404).body(null);
        }
    }
}
