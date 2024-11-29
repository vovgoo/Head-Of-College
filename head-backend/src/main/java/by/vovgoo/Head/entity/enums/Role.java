package by.vovgoo.Head.entity.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ADMIN,
    TEACHER,
    USER;

    @Override
    public String getAuthority() {
        return name();
    }
}
