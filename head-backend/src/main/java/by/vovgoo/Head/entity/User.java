package by.vovgoo.Head.entity;

import by.vovgoo.Head.entity.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Entity
@Table(name = "Пользователи")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Фото_профиля")
    private String image;

    @NotNull
    @NotBlank
    @Column(name = "Фамилия")
    private String surname;

    @NotNull
    @NotBlank
    @Column(name = "Имя")
    private String name;

    @NotNull
    @NotBlank
    @Column(name = "Отчество")
    private String fathername;

    @NotNull
    @Column(name = "Роль")
    @Enumerated(EnumType.STRING)
    private Role role;

    @NotNull
    @NotBlank
    @Column(name = "Логин")
    private String login;

    @NotNull
    @NotBlank
    @Column(name = "Пароль")
    private String password;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return this.login;
    }
}
