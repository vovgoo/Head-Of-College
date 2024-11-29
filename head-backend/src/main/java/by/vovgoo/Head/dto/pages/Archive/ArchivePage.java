package by.vovgoo.Head.dto.pages.Archive;

import by.vovgoo.Head.dto.auth.PageResponse;
import by.vovgoo.Head.entity.Archive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collections;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArchivePage {

    private PageResponse<Archive> archiveList = new PageResponse<>(Collections.emptyList(), new PageResponse.Metadata(0, 10, 0));;

}
