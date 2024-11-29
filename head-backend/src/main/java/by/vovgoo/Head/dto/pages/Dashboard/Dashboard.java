package by.vovgoo.Head.dto.pages.Dashboard;

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
public class Dashboard {

    private DashboardUser users;

    private DashboardInfo dashboard;

    @Builder.Default
    private List<DashboardGroup> groups = new ArrayList<>();
}
