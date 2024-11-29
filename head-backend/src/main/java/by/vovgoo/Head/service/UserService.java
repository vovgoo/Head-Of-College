package by.vovgoo.Head.service;

import by.vovgoo.Head.dto.pages.Topics.TopicsPage;
import by.vovgoo.Head.filters.TopicsOfDiplomaThesesFilter;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;


public interface UserService {

    TopicsPage getTopicsPage(Pageable pageable, TopicsOfDiplomaThesesFilter topicsOfDiplomaThesesFilter);

    UserDetailsService userDetailsService();
}
