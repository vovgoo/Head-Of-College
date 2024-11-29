package by.vovgoo.Head.dto.pages.InsertUpdatePage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InsertUpdateInfoColumns {

    private String columnName;

    private String columnType;

    private String dataType;

    private Object value;

    @Builder.Default
    private List<Object> valuesType = new ArrayList<>();
}