package by.vovgoo.Head.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSanctions is a Querydsl query type for Sanctions
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSanctions extends EntityPathBase<Sanctions> {

    private static final long serialVersionUID = -1004282670L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSanctions sanctions = new QSanctions("sanctions");

    public final StringPath description = createString("description");

    public final DateTimePath<java.time.LocalDateTime> endDate = createDateTime("endDate", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DateTimePath<java.time.LocalDateTime> startDate = createDateTime("startDate", java.time.LocalDateTime.class);

    public final QStudents students;

    public QSanctions(String variable) {
        this(Sanctions.class, forVariable(variable), INITS);
    }

    public QSanctions(Path<? extends Sanctions> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSanctions(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSanctions(PathMetadata metadata, PathInits inits) {
        this(Sanctions.class, metadata, inits);
    }

    public QSanctions(Class<? extends Sanctions> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.students = inits.isInitialized("students") ? new QStudents(forProperty("students"), inits.get("students")) : null;
    }

}

