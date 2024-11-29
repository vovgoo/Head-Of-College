package by.vovgoo.Head.dto.pages.TablePage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColumnInfo {

    private String columnName;

    private String columnType;

    private String dataType;
}
