package by.vovgoo.Head.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 919327349L;

    public static final QUser user = new QUser("user");

    public final StringPath fathername = createString("fathername");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath image = createString("image");

    public final StringPath login = createString("login");

    public final StringPath name = createString("name");

    public final StringPath password = createString("password");

    public final EnumPath<by.vovgoo.Head.entity.enums.Role> role = createEnum("role", by.vovgoo.Head.entity.enums.Role.class);

    public final StringPath surname = createString("surname");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

