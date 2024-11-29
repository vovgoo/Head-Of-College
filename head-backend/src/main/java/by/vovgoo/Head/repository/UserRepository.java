    package by.vovgoo.Head.repository;

    import by.vovgoo.Head.entity.TopicsOfDiplomaTheses;
    import by.vovgoo.Head.entity.User;
    import by.vovgoo.Head.filters.TopicsOfDiplomaThesesFilter;
    import org.springframework.data.domain.Page;
    import org.springframework.data.domain.Pageable;

    import java.util.List;
    import java.util.Optional;

    public interface UserRepository {

        Optional<User> findByLogin(String login);

        List<Integer> getTopicsYears();

        Page<TopicsOfDiplomaTheses> findAll(Pageable pageable, TopicsOfDiplomaThesesFilter topicsFilter);
    }
