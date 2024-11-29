package by.vovgoo.Head.dto.pages.Topics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TopicsOfDiplomaThesesDto {

    private Long id;

    private String description;

    private Integer year;

}
