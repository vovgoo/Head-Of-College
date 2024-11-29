package by.vovgoo.Head.dto.pages.Dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardInfo {

    private Integer total_students;

    private Integer students_with_theses;

    private Integer total_groups;

    private Integer students_with_discipline;

    private Integer students_with_bonus;

    private Integer students_without_scholarship;

    private Integer students_above_9;

}
