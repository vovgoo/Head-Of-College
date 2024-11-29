package by.vovgoo.Head.dto.pages.InfoAboutRow;

import by.vovgoo.Head.dto.pages.TablePage.ColumnInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TypeInfoRow {

    @Builder.Default
    private List<ColumnInfo> types = new ArrayList<>();

    @Builder.Default
    private List<Map<String, Object>> fields = new ArrayList<>();
}
