package by.vovgoo.Head.controller;

import by.vovgoo.Head.dto.auth.JwtAuthResponse;
import by.vovgoo.Head.dto.auth.SignInRequest;
import by.vovgoo.Head.dto.pages.Topics.TopicsPage;
import by.vovgoo.Head.filters.TopicsOfDiplomaThesesFilter;
import by.vovgoo.Head.service.AuthService;
import by.vovgoo.Head.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users/")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private final AuthService authService;

    @GetMapping("/topics")
    public TopicsPage getTopicsOfDiplomaTheses(Pageable pageable, TopicsOfDiplomaThesesFilter topicsOfDiplomaThesesFilter) {
        return userService.getTopicsPage(pageable, topicsOfDiplomaThesesFilter);
    }

    @PostMapping("/signIn")
    public JwtAuthResponse signIn(@Validated @RequestBody SignInRequest signInRequest) {
        return authService.signIn(signInRequest);
    }
}
