package by.vovgoo.Head.dto.pages.Dashboard;

import by.vovgoo.Head.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardUser {

    private Long id;

    private String image;

    private String surname;

    private String name;

    private String fathername;

    private Role role;

    private String login;
}
