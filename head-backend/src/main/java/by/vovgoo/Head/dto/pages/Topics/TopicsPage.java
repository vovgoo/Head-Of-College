package by.vovgoo.Head.dto.pages.Topics;

import by.vovgoo.Head.dto.auth.PageResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TopicsPage {

    public List<Integer> years;

    public PageResponse<TopicsOfDiplomaThesesDto> topicsOfDiplomaTheses;
}
