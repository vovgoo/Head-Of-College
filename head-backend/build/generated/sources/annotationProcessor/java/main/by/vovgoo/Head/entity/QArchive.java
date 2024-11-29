package by.vovgoo.Head.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QArchive is a Querydsl query type for Archive
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QArchive extends EntityPathBase<Archive> {

    private static final long serialVersionUID = -1926266408L;

    public static final QArchive archive = new QArchive("archive");

    public final StringPath date = createString("date");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public QArchive(String variable) {
        super(Archive.class, forVariable(variable));
    }

    public QArchive(Path<? extends Archive> path) {
        super(path.getType(), path.getMetadata());
    }

    public QArchive(PathMetadata metadata) {
        super(Archive.class, metadata);
    }

}

