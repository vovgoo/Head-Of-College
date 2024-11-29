package by.vovgoo.Head.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStudents is a Querydsl query type for Students
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStudents extends EntityPathBase<Students> {

    private static final long serialVersionUID = -287357118L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStudents students = new QStudents("students");

    public final ListPath<Allowances, QAllowances> allowances = this.<Allowances, QAllowances>createList("allowances", Allowances.class, QAllowances.class, PathInits.DIRECT2);

    public final NumberPath<Double> averageBall = createNumber("averageBall", Double.class);

    public final StringPath comment = createString("comment");

    public final StringPath fathername = createString("fathername");

    public final QGroup group;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath image = createString("image");

    public final StringPath name = createString("name");

    public final ListPath<Sanctions, QSanctions> sanctions = this.<Sanctions, QSanctions>createList("sanctions", Sanctions.class, QSanctions.class, PathInits.DIRECT2);

    public final StringPath surname = createString("surname");

    public QStudents(String variable) {
        this(Students.class, forVariable(variable), INITS);
    }

    public QStudents(Path<? extends Students> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStudents(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStudents(PathMetadata metadata, PathInits inits) {
        this(Students.class, metadata, inits);
    }

    public QStudents(Class<? extends Students> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.group = inits.isInitialized("group") ? new QGroup(forProperty("group"), inits.get("group")) : null;
    }

}

