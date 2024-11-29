package by.vovgoo.Head.service.impl;

import by.vovgoo.Head.dto.auth.JwtAuthResponse;
import by.vovgoo.Head.dto.auth.SignInRequest;
import by.vovgoo.Head.repository.UserRepository;
import by.vovgoo.Head.service.AuthService;
import by.vovgoo.Head.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private final UserRepository userRepository;

    @Override
    public JwtAuthResponse signIn(SignInRequest signInRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getLogin(),
                signInRequest.getPassword()));

        var user = userRepository.findByLogin(signInRequest.getLogin()).orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        var jwt = jwtService.generateToken(user);

        JwtAuthResponse jwtAuthenticationResponse = new JwtAuthResponse();
        jwtAuthenticationResponse.setToken(jwt);
        return jwtAuthenticationResponse;
    }

}
