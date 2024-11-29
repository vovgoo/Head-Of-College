package by.vovgoo.Head.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTopicsOfDiplomaTheses is a Querydsl query type for TopicsOfDiplomaTheses
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTopicsOfDiplomaTheses extends EntityPathBase<TopicsOfDiplomaTheses> {

    private static final long serialVersionUID = -1227305331L;

    public static final QTopicsOfDiplomaTheses topicsOfDiplomaTheses = new QTopicsOfDiplomaTheses("topicsOfDiplomaTheses");

    public final StringPath description = createString("description");

    public final StringPath fathername = createString("fathername");

    public final StringPath group = createString("group");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public final StringPath surname = createString("surname");

    public final NumberPath<Integer> year = createNumber("year", Integer.class);

    public QTopicsOfDiplomaTheses(String variable) {
        super(TopicsOfDiplomaTheses.class, forVariable(variable));
    }

    public QTopicsOfDiplomaTheses(Path<? extends TopicsOfDiplomaTheses> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTopicsOfDiplomaTheses(PathMetadata metadata) {
        super(TopicsOfDiplomaTheses.class, metadata);
    }

}

