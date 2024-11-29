package by.vovgoo.Head.controller;

import by.vovgoo.Head.dto.pages.Archive.ArchivePage;
import by.vovgoo.Head.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/archive")
    public ArchivePage getArchivePage(Pageable pageable) {
        return adminService.getArchivePage(pageable);
    }

    @GetMapping("/archive/{id}")
    public ResponseEntity<InputStreamResource> getArchive(@PathVariable Long id) {
        return adminService.getArchive(id);
    }

    @PostMapping("/archive")
    public void addArchive() {
        adminService.addArchive();
    }

}
