package by.vovgoo.Head.service;

import by.vovgoo.Head.dto.pages.Archive.ArchivePage;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface AdminService {
    ArchivePage getArchivePage(Pageable pageable);

    ResponseEntity<InputStreamResource> getArchive(Long id);

    void addArchive();
}
