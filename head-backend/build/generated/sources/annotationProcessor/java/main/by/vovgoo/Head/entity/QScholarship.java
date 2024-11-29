package by.vovgoo.Head.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QScholarship is a Querydsl query type for Scholarship
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QScholarship extends EntityPathBase<Scholarship> {

    private static final long serialVersionUID = -478534600L;

    public static final QScholarship scholarship = new QScholarship("scholarship");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Double> lower = createNumber("lower", Double.class);

    public final NumberPath<Double> price = createNumber("price", Double.class);

    public final NumberPath<Double> upper = createNumber("upper", Double.class);

    public QScholarship(String variable) {
        super(Scholarship.class, forVariable(variable));
    }

    public QScholarship(Path<? extends Scholarship> path) {
        super(path.getType(), path.getMetadata());
    }

    public QScholarship(PathMetadata metadata) {
        super(Scholarship.class, metadata);
    }

}

