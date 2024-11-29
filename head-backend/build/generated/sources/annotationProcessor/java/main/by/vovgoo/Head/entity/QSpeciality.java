package by.vovgoo.Head.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSpeciality is a Querydsl query type for Speciality
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSpeciality extends EntityPathBase<Speciality> {

    private static final long serialVersionUID = -1237831553L;

    public static final QSpeciality speciality = new QSpeciality("speciality");

    public final ListPath<Group, QGroup> groups = this.<Group, QGroup>createList("groups", Group.class, QGroup.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public QSpeciality(String variable) {
        super(Speciality.class, forVariable(variable));
    }

    public QSpeciality(Path<? extends Speciality> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSpeciality(PathMetadata metadata) {
        super(Speciality.class, metadata);
    }

}

