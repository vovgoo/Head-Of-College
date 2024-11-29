package by.vovgoo.Head.repository;

import by.vovgoo.Head.dto.auth.PageResponse;
import by.vovgoo.Head.entity.Archive;
import org.springframework.data.domain.Pageable;

public interface AdminRepository {

    PageResponse<Archive> getArchiveList(Pageable pageable);

    void addArchive(String fileName);

    String getArchive(Long id);
}
