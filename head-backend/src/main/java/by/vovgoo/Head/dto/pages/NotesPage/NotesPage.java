package by.vovgoo.Head.dto.pages.NotesPage;

import by.vovgoo.Head.dto.auth.PageResponse;
import by.vovgoo.Head.entity.enums.NoteAccess;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Collections;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotesPage {

    @Builder.Default
    private PageResponse<NoteDto> notes = new PageResponse<>(Collections.emptyList(), new PageResponse.Metadata(0, 10, 0));

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class NoteDto {

        private Long id;

        private String title;

        private String text;

        private LocalDateTime createTime;

        private NoteAccess noteAccess;
    }
}
