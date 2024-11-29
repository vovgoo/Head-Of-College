package by.vovgoo.Head.service.impl;

import by.vovgoo.Head.dto.auth.PageResponse;
import by.vovgoo.Head.dto.pages.Topics.TopicsOfDiplomaThesesDto;
import by.vovgoo.Head.dto.pages.Topics.TopicsPage;
import by.vovgoo.Head.filters.TopicsOfDiplomaThesesFilter;
import by.vovgoo.Head.repository.UserRepository;
import by.vovgoo.Head.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public TopicsPage getTopicsPage(Pageable pageable, TopicsOfDiplomaThesesFilter topicFilter) {

        Page<TopicsOfDiplomaThesesDto> topicsOfDiplomaThesesPageResponse = userRepository.findAll(pageable, topicFilter)
                .map(
                    obj -> TopicsOfDiplomaThesesDto.builder()
                            .id(obj.getId())
                            .description(obj.getDescription())
                            .year(obj.getYear())
                            .build()
                );

        return TopicsPage.builder()
                .topicsOfDiplomaTheses(PageResponse.of(topicsOfDiplomaThesesPageResponse))
                .years(userRepository.getTopicsYears())
                .build();
    }

    @Override
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByLogin(username).orElseThrow(() -> new UsernameNotFoundException(username));
    }
}
