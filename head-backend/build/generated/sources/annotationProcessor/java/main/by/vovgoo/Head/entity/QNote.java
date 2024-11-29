package by.vovgoo.Head.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QNote is a Querydsl query type for Note
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QNote extends EntityPathBase<Note> {

    private static final long serialVersionUID = 919115420L;

    public static final QNote note = new QNote("note");

    public final DateTimePath<java.time.LocalDateTime> createTime = createDateTime("createTime", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final EnumPath<by.vovgoo.Head.entity.enums.NoteAccess> noteAccess = createEnum("noteAccess", by.vovgoo.Head.entity.enums.NoteAccess.class);

    public final StringPath text = createString("text");

    public final StringPath title = createString("title");

    public QNote(String variable) {
        super(Note.class, forVariable(variable));
    }

    public QNote(Path<? extends Note> path) {
        super(path.getType(), path.getMetadata());
    }

    public QNote(PathMetadata metadata) {
        super(Note.class, metadata);
    }

}

