package by.vovgoo.Head.repository.impl;

import by.vovgoo.Head.dto.QPredicates;
import by.vovgoo.Head.entity.QTopicsOfDiplomaTheses;
import by.vovgoo.Head.entity.TopicsOfDiplomaTheses;
import by.vovgoo.Head.entity.User;
import by.vovgoo.Head.filters.TopicsOfDiplomaThesesFilter;
import by.vovgoo.Head.repository.UserRepository;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static by.vovgoo.Head.entity.QTopicsOfDiplomaTheses.topicsOfDiplomaTheses;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {

    private final EntityManager entityManager;

    private final JPAQueryFactory queryFactory;

    private static final String GET_TOPICS_YEARS = "SELECT DISTINCT год FROM темы_дипломных_работ ORDER BY год";

    private static final String FIND_USER_BY_LOGIN = "SELECT u FROM User u WHERE u.login = :login";

    private JPAQuery<TopicsOfDiplomaTheses> applyOrderBy(JPAQuery<TopicsOfDiplomaTheses> query, OrderSpecifier<?> orderSpecifier) {
        if (orderSpecifier != null) {
            query.orderBy(orderSpecifier);
        }
        return query;
    }

    private OrderSpecifier<?> getOrderSpecifier(TopicsOfDiplomaThesesFilter topicsFilter) {
        if (topicsFilter.topicSorts() == null) {
            return null;
        }

        return switch (topicsFilter.topicSorts()) {
            case yearsAsk -> new OrderSpecifier<>(Order.ASC, QTopicsOfDiplomaTheses.topicsOfDiplomaTheses.year);
            case yearsDesk -> new OrderSpecifier<>(Order.DESC, QTopicsOfDiplomaTheses.topicsOfDiplomaTheses.year);
            case descriptionAsk ->
                    new OrderSpecifier<>(Order.ASC, QTopicsOfDiplomaTheses.topicsOfDiplomaTheses.description);
            case descriptionDesk ->
                    new OrderSpecifier<>(Order.DESC, QTopicsOfDiplomaTheses.topicsOfDiplomaTheses.description);
        };
    }

    @Override
    public Optional<User> findByLogin(String login) {
        User user = entityManager.createQuery(FIND_USER_BY_LOGIN, User.class)
                .setParameter("login", login)
                .getResultList()
                .stream()
                .findFirst()
                .orElse(null);

        return Optional.ofNullable(user);
    }

    @Override
    public List<Integer> getTopicsYears() {
        List<?> result = entityManager.createNativeQuery(GET_TOPICS_YEARS).getResultList();
        return result.stream()
                .map(year -> (Integer) year)
                .collect(Collectors.toList());
    }

    @Override
    public Page<TopicsOfDiplomaTheses> findAll(Pageable pageable, TopicsOfDiplomaThesesFilter topicsFilter) {

        var pageRequest = PageRequest.of(pageable.getPageNumber(), 10);
        var predicates = QPredicates.builder()
                .add(topicsFilter.description(), topicsOfDiplomaTheses.description::containsIgnoreCase)
                .add(topicsFilter.yearMin(), topicsOfDiplomaTheses.year::goe)
                .add(topicsFilter.yearMax(), topicsOfDiplomaTheses.year::loe)
                .build();

        QTopicsOfDiplomaTheses qEntity = QTopicsOfDiplomaTheses.topicsOfDiplomaTheses;

        OrderSpecifier<?> orderSpecifier = getOrderSpecifier(topicsFilter);

        List<TopicsOfDiplomaTheses> results = applyOrderBy(queryFactory.selectFrom(qEntity)
                .where(predicates)
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize()), orderSpecifier)
                .fetch();

        long total = queryFactory.selectFrom(qEntity)
                .where(predicates)
                .fetch()
                .size();

        return new PageImpl<>(results, pageRequest, total);
    }

}
