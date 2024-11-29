package by.vovgoo.Head.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {

    void uploadImage(MultipartFile file) throws IOException;

    byte[] getImage(String imageName) throws IOException;

}
