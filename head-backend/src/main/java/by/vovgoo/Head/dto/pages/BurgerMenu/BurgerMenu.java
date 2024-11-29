package by.vovgoo.Head.dto.pages.BurgerMenu;

import by.vovgoo.Head.dto.pages.Dashboard.DashboardUser;
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
public class BurgerMenu {

    private DashboardUser users;

    @Builder.Default
    private List<String> tables = new ArrayList<>();
}
