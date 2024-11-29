package by.vovgoo.Head.service.impl;

import by.vovgoo.Head.service.ImageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class ImageServiceImpl implements ImageService {

    @Value("${image.upload-dir}")
    private String uploadDir;

    public void uploadImage(MultipartFile file) throws IOException {
        Path directoryPath = Paths.get(uploadDir);
        if (!Files.exists(directoryPath)) {
            Files.createDirectories(directoryPath);
        }

        if (file.isEmpty()) {
            throw new IOException("File is empty");
        }

        Path path = Paths.get(uploadDir, file.getOriginalFilename());
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
    }

    public byte[] getImage(String imageName) throws IOException {
        Path path = Paths.get(uploadDir, imageName);
        if (Files.exists(path)) {
            return Files.readAllBytes(path);
        } else {
            throw new IOException("Image not found");
        }
    }

}
