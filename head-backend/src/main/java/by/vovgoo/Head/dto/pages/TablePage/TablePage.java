package by.vovgoo.Head.dto.pages.TablePage;

import by.vovgoo.Head.dto.auth.PageResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TablePage {

    private String tableName;

    private Long countRows;

    private Double tableSize;

    @Builder.Default
    private List<ColumnInfo> columns = new ArrayList<>();

    @Builder.Default
    PageResponse<Map<String, Object>> tableData = new PageResponse<>(Collections.emptyList(), new PageResponse.Metadata(0, 10, 0));
}
