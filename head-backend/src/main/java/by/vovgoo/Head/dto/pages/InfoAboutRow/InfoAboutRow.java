package by.vovgoo.Head.dto.pages.InfoAboutRow;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.LinkedHashMap;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class InfoAboutRow {

    @Builder.Default
    private Map<String, TypeInfoRow> rowInfo = new LinkedHashMap<>();
}
