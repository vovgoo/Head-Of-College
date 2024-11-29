package by.vovgoo.Head.service.impl;

import by.vovgoo.Head.dto.pages.Archive.ArchivePage;
import by.vovgoo.Head.repository.AdminRepository;
import by.vovgoo.Head.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    private final RestTemplate restTemplate;

    @Value("${archive.upload-dir}")
    private String uploadDir;

    @Value("${head-archivator.url}")
    private String archive_url;

    @Override
    public ArchivePage getArchivePage(Pageable pageable) {
        return ArchivePage.builder()
                .archiveList(adminRepository.getArchiveList(pageable))
                .build();
    }

    @Override
    public ResponseEntity<InputStreamResource> getArchive(Long id) {

        String archiveName = adminRepository.getArchive(id);

        Path filePath = Paths.get(uploadDir, archiveName);

        if (!Files.exists(filePath)) {
            return ResponseEntity.notFound().build();
        }

        try {
            InputStreamResource resource = new InputStreamResource(Files.newInputStream(filePath));

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + archiveName + "\"")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        } catch (IOException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public void addArchive() {
        Path directoryPath = Paths.get(uploadDir);

        if (!Files.exists(directoryPath)) {
            try {
                Files.createDirectories(directoryPath);
            } catch (IOException ex) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        String url =  archive_url + "/archive";
        ResponseEntity<byte[]> response = restTemplate.exchange(url, HttpMethod.GET, null, byte[].class);

        if (response.getBody() != null) {
            String fileName = response.getHeaders().getFirst("Archive-Name");

            if (fileName == null) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
            }

            Path filePath = directoryPath.resolve(fileName);

            try {
                Files.write(filePath, response.getBody());
                System.out.println("Archive saved at: " + filePath.toAbsolutePath());
            } catch (IOException ex) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save archive", ex);
            }

            adminRepository.addArchive(fileName);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No archive received from the server");
        }
    }
}
