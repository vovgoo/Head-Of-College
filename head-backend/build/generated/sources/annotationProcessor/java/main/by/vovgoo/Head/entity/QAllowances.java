package by.vovgoo.Head.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAllowances is a Querydsl query type for Allowances
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAllowances extends EntityPathBase<Allowances> {

    private static final long serialVersionUID = -1579931003L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAllowances allowances = new QAllowances("allowances");

    public final DateTimePath<java.time.LocalDateTime> endDate = createDateTime("endDate", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Double> price = createNumber("price", Double.class);

    public final DateTimePath<java.time.LocalDateTime> startDate = createDateTime("startDate", java.time.LocalDateTime.class);

    public final QStudents students;

    public final StringPath title = createString("title");

    public QAllowances(String variable) {
        this(Allowances.class, forVariable(variable), INITS);
    }

    public QAllowances(Path<? extends Allowances> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAllowances(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAllowances(PathMetadata metadata, PathInits inits) {
        this(Allowances.class, metadata, inits);
    }

    public QAllowances(Class<? extends Allowances> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.students = inits.isInitialized("students") ? new QStudents(forProperty("students"), inits.get("students")) : null;
    }

}

