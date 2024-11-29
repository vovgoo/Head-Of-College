package by.vovgoo.Head.service;

import by.vovgoo.Head.dto.auth.JwtAuthResponse;
import by.vovgoo.Head.dto.auth.SignInRequest;

public interface AuthService {

    JwtAuthResponse signIn(SignInRequest signInRequest);

}
