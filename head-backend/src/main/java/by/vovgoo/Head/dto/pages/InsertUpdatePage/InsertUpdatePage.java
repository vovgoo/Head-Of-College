package by.vovgoo.Head.dto.pages.InsertUpdatePage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InsertUpdatePage {

    @Builder.Default
    private List<InsertUpdateInfoColumns> columns = new ArrayList<>();
}
