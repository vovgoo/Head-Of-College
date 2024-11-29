package by.vovgoo.Head.repository.impl;

import by.vovgoo.Head.dto.auth.PageResponse;
import by.vovgoo.Head.entity.Archive;
import by.vovgoo.Head.entity.QArchive;
import by.vovgoo.Head.repository.AdminRepository;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Repository
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminRepositoryImpl implements AdminRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public PageResponse<Archive> getArchiveList(Pageable pageable) {

        var pageRequest = PageRequest.of(pageable.getPageNumber(), 10);

        QArchive qArchive = QArchive.archive;

        OrderSpecifier<Long> orderSpecifier = qArchive.id.desc();

        List<Archive> results = queryFactory.selectFrom(qArchive)
                .orderBy(orderSpecifier)
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();

        long total = queryFactory.selectFrom(qArchive)
                .fetch()
                .size();

        return PageResponse.of(new PageImpl<>(results, pageRequest, total));
    }

    @Override
    @Transactional
    public void addArchive(String fileName) {
        QArchive qArchive = QArchive.archive;

        queryFactory.insert(qArchive)
                .columns(qArchive.date)
                .values(fileName)
                .execute();
    }

    @Override
    public String getArchive(Long id) {
        QArchive qArchive = QArchive.archive;

        String date = queryFactory.select(qArchive.date)
                .from(qArchive)
                .where(qArchive.id.eq(id))
                .fetchOne();

        if (date == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return date;
    }
}
