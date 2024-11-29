package by.vovgoo.Head.repository.impl;

import by.vovgoo.Head.config.EntityConfig;
import by.vovgoo.Head.config.TableConfig;
import by.vovgoo.Head.dto.QPredicates;
import by.vovgoo.Head.dto.pages.Dashboard.Dashboard;
import by.vovgoo.Head.dto.pages.Dashboard.DashboardGroup;
import by.vovgoo.Head.dto.pages.Dashboard.DashboardInfo;
import by.vovgoo.Head.dto.pages.InfoAboutRow.TypeInfoRow;
import by.vovgoo.Head.dto.pages.InsertUpdatePage.InsertUpdateInfoColumns;
import by.vovgoo.Head.dto.pages.NotesPage.NotesPage;
import by.vovgoo.Head.dto.pages.TablePage.ColumnInfo;
import by.vovgoo.Head.entity.QNote;
import by.vovgoo.Head.entity.User;
import by.vovgoo.Head.entity.enums.NoteAccess;
import by.vovgoo.Head.entity.enums.Role;
import by.vovgoo.Head.filters.TablesFilter;
import by.vovgoo.Head.repository.TeacherRepository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.function.Consumer;
import java.util.stream.Collectors;

import static by.vovgoo.Head.entity.QNote.note;

@Repository
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeacherRepositoryImpl implements TeacherRepository {

    private final EntityManager entityManager;

    private final JPAQueryFactory queryFactory;

    private final EntityConfig entityConfig;

    private final TableConfig tableConfig;

    private final PasswordEncoder passwordEncoder;

    private static final String GET_SIZE_TABLE_QUERY = "SELECT ROUND(pg_total_relation_size('%s') / 1024.0, 2) AS size_kb";

    private static final String GET_COUNT_ROWS_QUERY = "SELECT COUNT(*) FROM %s";

    @SuppressWarnings("all")
    private static final String GET_ALL_TABLES = "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')";

    @SuppressWarnings("all")
    private static final String GET_DASHBOARD_GROUPS_INFO = """
            SELECT название_группы as name,
                      (SELECT название_специальности FROM специальности where a.id_специальности = id) as specialty,
                      (SELECT COUNT(*) FROM студенты WHERE id_группы = a.id) as totalStudents,
                      (SELECT ROUND(AVG(средний_балл)::numeric, 2) FROM студенты WHERE id_группы = a.id) as averageScore,
                      (SELECT COUNT(*) FROM (SELECT id_студента FROM надбавки inner join public.студенты с on с.id = надбавки.id_студента inner join public.группы г on г.id = с.id_группы WHERE id_группы = a.id AND дата_начала <= current_date AND дата_конца >= current_date GROUP BY id_студента) AS bonus_subquery) as studentsWithBonuses,
                      (SELECT COUNT(*) FROM (SELECT id_студента FROM взыскания inner join public.студенты с on с.id = взыскания.id_студента inner join public.группы г on г.id = с.id_группы WHERE id_группы = a.id AND дата_начала <= current_date AND дата_конца >= current_date GROUP BY id_студента) AS penalty_subquery) as studentsWithPenalties,
                      (SELECT COUNT(*) FROM студенты WHERE средний_балл >= 0 AND средний_балл <= 0.9 AND id_группы = a.id) as score1,
                      (SELECT COUNT(*) FROM студенты WHERE средний_балл >= 1 AND средний_балл <= 1.9 AND id_группы = a.id) as score2,
                      (SELECT COUNT(*) FROM студенты WHERE средний_балл >= 2 AND средний_балл <= 2.9 AND id_группы = a.id) as score3,
                      (SELECT COUNT(*) FROM студенты WHERE средний_балл >= 3 AND средний_балл <= 3.9 AND id_группы = a.id) as score4,
                      (SELECT COUNT(*) FROM студенты WHERE средний_балл >= 4 AND средний_балл <= 4.9 AND id_группы = a.id) as score5,
                      (SELECT COUNT(*) FROM студенты WHERE средний_балл >= 5 AND средний_балл <= 5.9 AND id_группы = a.id) as score6,
                      (SELECT COUNT(*) FROM студенты WHERE средний_балл >= 6 AND средний_балл <= 6.9 AND id_группы = a.id) as score7,
                      (SELECT COUNT(*) FROM студенты WHERE средний_балл >= 7 AND средний_балл <= 7.9 AND id_группы = a.id) as score8,
                      (SELECT COUNT(*) FROM студенты WHERE средний_балл >= 8 AND средний_балл <= 8.9 AND id_группы = a.id) as score9,
                      (SELECT COUNT(*) FROM студенты WHERE средний_балл >= 9 AND средний_балл <= 10 AND id_группы = a.id) as score10
                FROM группы a;
            """;

    @SuppressWarnings("all")
    private static final String GET_DASHBOARD_INFO = """
            SELECT 'total_students', COUNT(*) FROM студенты
            UNION
            SELECT 'students_with_theses', COUNT(*) FROM темы_дипломных_работ WHERE год = EXTRACT(YEAR FROM CURRENT_DATE)
            UNION
            SELECT 'total_groups', COUNT(*) FROM группы
            UNION
            SELECT 'students_with_discipline', COUNT(DISTINCT id_студента) FROM взыскания WHERE дата_начала <= CURRENT_DATE AND дата_конца >= CURRENT_DATE
            UNION
            SELECT 'students_with_bonus', COUNT(DISTINCT id_студента) FROM надбавки WHERE дата_начала <= CURRENT_DATE AND дата_конца >= CURRENT_DATE
            UNION
            SELECT 'students_without_scholarship', COUNT(*) FROM студенты WHERE средний_балл < 5
            UNION
            SELECT 'students_above_9', COUNT(*) FROM студенты WHERE средний_балл >= 9;
            """;



    @Override
    public Optional<Double> getSizeTable(String tableName) {
        if (tableName == null || !tableName.matches("^[а-яА-Я_]+$")) {
            throw new IllegalArgumentException("Invalid table name: " + tableName + ". It must only contain letters and underscores.");
        }

        String query = String.format(GET_SIZE_TABLE_QUERY, tableName);
        BigDecimal result = (BigDecimal) entityManager.createNativeQuery(query).getSingleResult();

        return Optional.of(result.doubleValue());
    }

    @Override
    public Optional<Long> getCountRows(String tableName) {
        if (tableName == null || !tableName.matches("^[а-яА-Я_]+$")) {
            throw new IllegalArgumentException("Invalid table name: " + tableName + ". It must only contain letters and underscores.");
        }

        String query = String.format(GET_COUNT_ROWS_QUERY, tableName);

        Long count = ((Number) entityManager.createNativeQuery(query).getSingleResult()).longValue();
        return Optional.of(count);
    }

    @Override
    public List<String> findAllTables() {
        List<?> result = entityManager.createNativeQuery(GET_ALL_TABLES).getResultList();
        return result.stream()
                .map(year -> (String) year)
                .filter(tableName -> !tableName.toLowerCase().contains("архив"))
                .collect(Collectors.toList());
    }

    @Override
    public Dashboard getDashboards() {
        Dashboard dashboard = new Dashboard();

        DashboardInfo dashboardInfo = new DashboardInfo();
        List<DashboardGroup> dashboardGroups = new ArrayList<>();

        List<Object[]> infoResult = entityManager.createNativeQuery(GET_DASHBOARD_INFO).getResultList();

        Map<String, Consumer<Integer>> dashboardInfoSetterMap = new HashMap<>() {{
            put("total_students", dashboardInfo::setTotal_students);
            put("students_with_theses", dashboardInfo::setStudents_with_theses);
            put("total_groups", dashboardInfo::setTotal_groups);
            put("students_with_discipline", dashboardInfo::setStudents_with_discipline);
            put("students_with_bonus", dashboardInfo::setStudents_with_bonus);
            put("students_without_scholarship", dashboardInfo::setStudents_without_scholarship);
            put("students_above_9", dashboardInfo::setStudents_above_9);
        }};

        infoResult.forEach(row ->
                Optional.ofNullable(dashboardInfoSetterMap.get((String) row[0]))
                        .ifPresent(setter -> setter.accept(((Number) row[1]).intValue()))
        );

        List<Object[]> groupResult = entityManager.createNativeQuery(GET_DASHBOARD_GROUPS_INFO).getResultList();

        for (Object[] row : groupResult) {
            DashboardGroup dashboardGroup = new DashboardGroup(
                    (String) row[0],
                    (String) row[1],
                    row[2] != null ? ((Long) row[2]).intValue() : 0,
                    row[3] != null ? ((BigDecimal) row[3]).doubleValue() : 0.0,
                    row[4] != null ? ((Long) row[4]).intValue() : 0,
                    row[5] != null ? ((Long) row[5]).intValue() : 0,
                    row[6] != null ? ((Long) row[6]).intValue() : 0,
                    row[7] != null ? ((Long) row[7]).intValue() : 0,
                    row[8] != null ? ((Long) row[8]).intValue() : 0,
                    row[9] != null ? ((Long) row[9]).intValue() : 0,
                    row[10] != null ? ((Long) row[10]).intValue() : 0,
                    row[11] != null ? ((Long) row[11]).intValue() : 0,
                    row[12] != null ? ((Long) row[12]).intValue() : 0,
                    row[13] != null ? ((Long) row[13]).intValue() : 0,
                    row[14] != null ? ((Long) row[14]).intValue() : 0,
                    row[15] != null ? ((Long) row[15]).intValue() : 0
            );
            dashboardGroups.add(dashboardGroup);
        }

        dashboard.setDashboard(dashboardInfo);
        dashboard.setGroups(dashboardGroups);

        return dashboard;
    }

    @Override
    public List<ColumnInfo> getColumnInfo(String tableName) {
        return entityConfig.entityColumnInfoMap().get(tableName);
    }

    @Override
    public Page<Map<String, Object>> findAll(String tableName, Pageable pageable, TablesFilter tablesFilter) {

        var pageRequest = PageRequest.of(pageable.getPageNumber(), 10);

        EntityPathBase<?> qEntity = entityConfig.QEntityPaths().get(tableName);

        OrderSpecifier<?> orderSpecifier;

        if (tablesFilter.sort() == null) {
            orderSpecifier = new OrderSpecifier<>(Order.ASC, Expressions.stringPath(qEntity, "id"));
        } else {
            orderSpecifier = new OrderSpecifier<>(Order.ASC, Expressions.stringPath(qEntity, tablesFilter.sort()));
        }

        var predicates = QPredicates.builder().build();
        if (tablesFilter.search() != null && !tablesFilter.search().isEmpty()) {
            predicates = buildWordPredicate(tablesFilter.search().toLowerCase(), qEntity);
        }

        List<?> results = queryFactory.selectFrom(qEntity)
                .where(predicates)
                .orderBy(orderSpecifier)
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();

        long total = queryFactory.selectFrom(qEntity)
                .where(predicates)
                .fetch()
                .size();

        return new PageImpl<>(getRowsFromTableConfig(tableName, results), pageRequest, total);
    }

    @Override
    public Map<String, TypeInfoRow> getRowInfo(String tableName, Long rowId) {

        EntityPathBase<?> qEntity = entityConfig.QEntityPaths().get(tableName);
        PathBuilder<?> pathBuilder = new PathBuilder<>(qEntity.getType(), qEntity.getMetadata());

        Map<String, TypeInfoRow> rowInfo = new LinkedHashMap<>();

        List<?> result = queryFactory.selectFrom(qEntity)
                .where(pathBuilder.get("id").eq(rowId))
                .fetch();

        if (result.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        if (result.size() > 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        rowInfo.put(tableName, TypeInfoRow.builder()
                .types(getColumnInfo(tableName))
                .fields(getRowsFromTableConfig(tableName, result))
                .build());

        createRowInfo(result.get(0), rowInfo);

        for(EntityConfig.ClassFieldPair classFieldPair : entityConfig.getClassWithFields(result.get(0).getClass())) {
            EntityPathBase<?> classEntity = entityConfig.QEntityPaths().get(classFieldPair.getClassName());
            PathBuilder<?> classBuilder = new PathBuilder<>(classEntity.getType(), classEntity.getMetadata());

            List<?> classResult = queryFactory.selectFrom(classEntity)
                    .where(classBuilder.get(classFieldPair.getFieldName()).eq(result.get(0)))
                    .fetch();

            rowInfo.put(classFieldPair.getClassName(), TypeInfoRow.builder()
                    .types(getColumnInfo(classFieldPair.getClassName()))
                    .fields(getRowsFromTableConfig(classFieldPair.getClassName(), classResult))
                    .build());
        }

        return rowInfo;
    }

    @Override
    public List<InsertUpdateInfoColumns> getInsertPage(String tableName) {
        List<InsertUpdateInfoColumns> result = new ArrayList<>();

        List<ColumnInfo> columnsInfo = entityConfig.entityColumnInfoMap().get(tableName);
        TableConfig.TableInfo columns = tableConfig.tableInfos().get(tableName);

        for(String field : columns.getFields()) {

            if(!field.equals("id")) {
                ColumnInfo columnInfo = columnsInfo.stream().filter(column -> field.equals(column.getColumnType()))
                        .findFirst().orElseThrow(() -> new IllegalArgumentException("Column with type not found"));;

                result.add(InsertUpdateInfoColumns.builder()
                        .columnName(columnInfo.getColumnName())
                        .columnType(columnInfo.getColumnType())
                        .dataType(columnInfo.getDataType())
                        .build());
            }
        }

        return result;
    }

    @Override
    public List<InsertUpdateInfoColumns> getUpdatePage(String tableName, Long rowId) {

        EntityPathBase<?> qEntity = entityConfig.QEntityPaths().get(tableName);
        PathBuilder<?> pathBuilder = new PathBuilder<>(qEntity.getType(), qEntity.getMetadata());

        List<?> result = queryFactory.selectFrom(qEntity)
                .where(pathBuilder.get("id").eq(rowId))
                .fetch();

        if (result.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        if (result.size() > 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        Object row = result.get(0);

        List<InsertUpdateInfoColumns> output = new ArrayList<>();

        List<ColumnInfo> columnsInfo = entityConfig.entityColumnInfoMap().get(tableName);
        TableConfig.TableInfo columns = tableConfig.tableInfos().get(tableName);

        for(String field : columns.getFields()) {

            if(!field.equals("id")) {
                ColumnInfo columnInfo = columnsInfo.stream().filter(column -> field.equals(column.getColumnType()))
                        .findFirst().orElseThrow(() -> new IllegalArgumentException("Column with type not found"));;

                output.add(InsertUpdateInfoColumns.builder()
                        .columnName(columnInfo.getColumnName())
                        .columnType(columnInfo.getColumnType())
                        .dataType(columnInfo.getDataType())
                        .value(getFieldValue(row, field))
                        .build());
            }
        }

        return output;
    }

    @Override
    public Map<Long, String> searchInTableByParam(String tableName, String param) {

        List<String> fields = tableConfig.tableSearchParams().get(tableName);

        EntityPathBase<?> qEntity = entityConfig.QEntityPaths().get(tableName);

        PathBuilder<?> entityPathBuilder = new PathBuilder<>(qEntity.getType(), qEntity.getMetadata());

        StringTemplate concatenatedFields = null;
        for (String field : fields) {
            StringPath path = entityPathBuilder.getString(field);
            if (concatenatedFields == null) {
                concatenatedFields = Expressions.stringTemplate("{0}", path);
            } else {
                concatenatedFields = Expressions.stringTemplate("{0} || ' ' || {1}", concatenatedFields, path);
            }
        }

        if (concatenatedFields == null) {
            return Map.of();
        }

        BooleanExpression predicate = concatenatedFields.containsIgnoreCase(param);

        List<?> results = queryFactory.select(qEntity)
                .from(qEntity)
                .where(predicate)
                .fetch();

        Map<Long, String> resultMap = new HashMap<>();

        for (Object result : results) {
            try {
                Field idField = result.getClass().getDeclaredField("id");
                idField.setAccessible(true);
                Long id = (Long) idField.get(result);

                StringBuilder concatenatedField = new StringBuilder();
                for (String field : fields) {
                    Field currentField = result.getClass().getDeclaredField(field);
                    currentField.setAccessible(true);
                    Object fieldValue = currentField.get(result);

                    if (fieldValue != null) {
                        concatenatedField.append(fieldValue.toString()).append(" ");
                    }
                }

                resultMap.put(id, concatenatedField.toString().trim());

            } catch (NoSuchFieldException | IllegalAccessException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
            }
        }

        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> insertIntoTable(String tableName, Map<String, Object> entity) {
        Object ClassEntity = entityConfig.ClassDefaultPath().get(tableName);

        if(ClassEntity.equals(User.class)) {
            entity.put("role", Role.TEACHER);
            String password = (String) entity.get("password");
            entity.put("password", passwordEncoder.encode(password));
        }

        if (ClassEntity == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Таблица не найдена");
        }

        try {
            Class<?> clazz = (Class<?>) ClassEntity;
            Object instance = clazz.getDeclaredConstructor().newInstance();

            for (Map.Entry<String, Object> entry : entity.entrySet()) {
                String fieldName = entry.getKey();
                Object value = entry.getValue();

                try {
                    Field field = clazz.getDeclaredField(fieldName);
                    field.setAccessible(true);

                    value = convertValueIfNeeded(field, value);

                    if (field.getType().isAnnotationPresent(Entity.class)) {
                        value = entityManager.find(field.getType(), value);
                    }

                    field.set(instance, value);
                } catch (NoSuchFieldException | IllegalAccessException e) {
                    System.out.println(e.getMessage());
                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Ошибка при создании или заполнении объекта", e);
                }
            }

            entityManager.persist(instance);

            return entity;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Ошибка при создании или заполнении объекта", e);
        }
    }

    @Override
    @Transactional
    public Map<String, Object> updateTable(String tableName, Long rowId, Map<String, Object> entity) {

        Object ClassEntity = entityConfig.ClassDefaultPath().get(tableName);

        if (ClassEntity == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Таблица не найдена");
        }

        if (ClassEntity.equals(User.class)) {
            String password = (String) entity.get("password");
            if (password != null && !password.isEmpty()) {
                entity.put("password", passwordEncoder.encode(password));
            }
        }

        try {
            Class<?> clazz = (Class<?>) ClassEntity;
            Object existingInstance = entityManager.find(clazz, rowId);

            if (existingInstance == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Запись не найдена");
            }

            for (Map.Entry<String, Object> entry : entity.entrySet()) {
                String fieldName = entry.getKey();
                Object newValue = entry.getValue();

                try {
                    Field field = clazz.getDeclaredField(fieldName);
                    field.setAccessible(true);

                    Object currentValue = field.get(existingInstance);

                    newValue = convertValueIfNeeded(field, newValue);

                    if(newValue == null && !fieldName.equals("password") && !fieldName.equals("image")) {
                        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
                    }

                    if (newValue == null && fieldName.equals("image")) {

                        if (field.getType().isAnnotationPresent(Entity.class)) {
                            newValue = entityManager.find(field.getType(), newValue);
                        }

                        field.set(existingInstance, newValue);
                    }

                    if (newValue != null && !newValue.equals(currentValue)) {

                        if (field.getType().isAnnotationPresent(Entity.class)) {
                            newValue = entityManager.find(field.getType(), newValue);
                        }

                        field.set(existingInstance, newValue);
                    }
                } catch (NoSuchFieldException | IllegalAccessException e) {
                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Ошибка при обновлении объекта", e);
                }
            }

            entityManager.merge(existingInstance);

            return entity;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Ошибка при обновлении объекта", e);
        }
    }

    @Override
    @Transactional
    public void deleteTable(String tableName, Long rowId) {

        Object classEntity = entityConfig.ClassDefaultPath().get(tableName);

        if (classEntity == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Таблица не найдена");
        }

        try {
            Class<?> clazz = (Class<?>) classEntity;
            Object existingInstance = entityManager.find(clazz, rowId);

            if (existingInstance == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Запись не найдена");
            }

            entityManager.remove(existingInstance);

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Ошибка при удалении записи", e);
        }
    }

    @Override
    public Page<NotesPage.NoteDto> getNotesPage(Pageable pageable, Role role, String search) {
        var pageRequest = PageRequest.of(pageable.getPageNumber(), 10);

        EntityPathBase<?> qEntity = entityConfig.QEntityPaths().get("заметки");

        OrderSpecifier<?> orderSpecifier = new OrderSpecifier<>(
                Order.DESC,
                Expressions.dateTimePath(LocalDateTime.class, "createTime")
        );

        BooleanBuilder predicates = new BooleanBuilder();

        if (role == Role.TEACHER) {
            predicates.and(note.noteAccess.eq(NoteAccess.ALL));
        }

        if (search != null && !search.isBlank()) {
            predicates.and(note.title.likeIgnoreCase("%" + search + "%"));
        }

        List<NotesPage.NoteDto> results = queryFactory.select(
                        Projections.constructor(
                                NotesPage.NoteDto.class,
                                Expressions.numberPath(Long.class, "id"),
                                Expressions.stringPath("title"),
                                Expressions.stringPath("text"),
                                Expressions.dateTimePath(LocalDateTime.class, "createTime"),
                                Expressions.enumPath(NoteAccess.class, "noteAccess")
                        )
                )
                .from(qEntity)
                .where(predicates)
                .orderBy(orderSpecifier)
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();

        long total = queryFactory.selectFrom(qEntity)
                .where(predicates)
                .fetch()
                .size();

        return new PageImpl<>(results, pageRequest, total);
    }

    private Object convertValueIfNeeded(Field field, Object value) {
        if (field.getType().equals(Long.class) && value instanceof Integer) {
            return ((Integer) value).longValue();
        } else if (field.getType().equals(Double.class) && value instanceof Integer) {
            return ((Integer) value).doubleValue();
        } else if (field.getType().equals(Double.class) && value instanceof Float) {
            return ((Float) value).doubleValue();
        } else if (field.getType().equals(Integer.class) && value instanceof Long) {
            return ((Long) value).intValue();
        } else if (field.getType().equals(LocalDateTime.class) && value instanceof String) {
            return LocalDateTime.parse((String) value, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        } else if (field.getType().equals(NoteAccess.class) && value instanceof String) {
             return NoteAccess.valueOf((String) value);
        }

        return value;
    }

    private Object getFieldValue(Object obj, String fieldName) {
        try {
            Field field = obj.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            return field.get(obj);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    private void createRowInfo(Object result, Map<String, TypeInfoRow> rowInfo) {

        for(Field field : result.getClass().getDeclaredFields()) {
            if(!field.getType().getPackage().getName().startsWith("by.vovgoo.Head.entity.enums") && field.getType().getPackage().getName().startsWith("by.vovgoo.Head.entity")) {
                field.setAccessible(true);
                try {
                    Object fieldValue = field.get(result);

                    String tableName = entityConfig.ClassPath().get(fieldValue.getClass());

                    TypeInfoRow typeInfoRow = TypeInfoRow.builder()
                            .types(getColumnInfo(tableName))
                            .fields(getRowsFromTableConfig(tableName, List.of(fieldValue)))
                            .build();

                    rowInfo.put(tableName, typeInfoRow);

                    createRowInfo(fieldValue, rowInfo);
                } catch (IllegalAccessException e) {
                    return;
                }
            }
        }


    }

    private List<Map<String, Object>> getRowsFromTableConfig(String tableName, List<?> results) {

        List<Map<String, Object>> rows = new ArrayList<>();
        TableConfig.TableInfo tableInfo = tableConfig.tableInfos().get(tableName);
        for (var result : results) {
            Map<String, Object> row = new LinkedHashMap<>();

            for (String fieldName : tableInfo.getFields()) {
                try {
                    Field field = result.getClass().getDeclaredField(fieldName);
                    field.setAccessible(true);
                    Object fieldValue = field.get(result);
                    row.put(fieldName, fieldValue);
                } catch (NoSuchFieldException | IllegalAccessException e) {
                    throw new RuntimeException(e);
                }
            }

            for (TableConfig.SpecialFields specialField : tableInfo.getSpecialFields()) {
                Map<String, Object> params = new LinkedHashMap<>();

                try {
                    for(String param : specialField.getParameters()) {
                        Field field = result.getClass().getDeclaredField(param);
                        field.setAccessible(true);
                        params.put(param, field.get(result));
                    }

                    Object specialFieldValue = executeQuery(specialField.getQuery(), params);

                    row.put(specialField.getName(), specialFieldValue);
                } catch (Exception e) {
                    row.put(specialField.getName(), null);
                }
            }

            rows.add(row);
        }

        return rows;
    }

    private Object executeQuery(String query, Map<String, Object> parameters) {

        Query nativeQuery = entityManager.createNativeQuery(query);

        if (parameters != null) {
            for (Map.Entry<String, Object> entry : parameters.entrySet()) {
                nativeQuery.setParameter(entry.getKey(), entry.getValue());
            }
        }

        return nativeQuery.getSingleResult();
    }

    private <T> Predicate buildWordPredicate(String search, EntityPathBase<T> qEntity) {
        QPredicates predicates = QPredicates.builder();
        String[] words = search.split("\\s+");

        for (String word : words) {
            for (Field field : qEntity.getType().getDeclaredFields()) {
                Class<?> fieldType = field.getType();

                if(!fieldType.getPackage().getName().startsWith("by.vovgoo.Head.entity.enums") && fieldType.getPackage().getName().startsWith("by.vovgoo.Head.entity")) {
                    Field nameField = null;
                    System.out.println(fieldType);
                    try {
                        nameField = fieldType.getDeclaredField("name");
                    } catch (NoSuchFieldException e) {
                        throw new RuntimeException(e);
                    }

                    if (nameField.getType().equals(String.class)) {
                        SimplePath<?> relatedEntityPath = Expressions.path(fieldType, qEntity, field.getName());

                        if (fieldType.getSimpleName().equals("Students")) {
                            StringPath relatedNamePath = Expressions.stringPath(relatedEntityPath, "name");
                            StringPath relatedFathernamePath = Expressions.stringPath(relatedEntityPath, "fathername");
                            StringPath relatedSurnamePath = Expressions.stringPath(relatedEntityPath, "surname");

                            predicates.add(word, w -> relatedNamePath.likeIgnoreCase("%" + w + "%")
                                    .or(relatedFathernamePath.likeIgnoreCase("%" + w + "%"))
                                    .or(relatedSurnamePath.likeIgnoreCase("%" + w + "%")));
                        } else {
                            StringPath relatedNamePath = Expressions.stringPath(relatedEntityPath, "name");
                            predicates.add(word, w -> relatedNamePath.likeIgnoreCase("%" + w + "%"));
                        }
                    }
                } else {
                    if (fieldType.equals(String.class)) {
                        StringPath stringPath = Expressions.stringPath(qEntity, field.getName());
                        predicates.add(word, w -> stringPath.likeIgnoreCase("%" + w + "%"));
                    }
                    if (Number.class.isAssignableFrom(fieldType)) {
                        if (isNumeric(word)) {
                            if (fieldType.equals(Long.class)) {
                                predicates.add(word, w -> Expressions.numberPath(Long.class, qEntity, field.getName())
                                        .eq(Long.parseLong(w)));
                            } else if (fieldType.equals(Integer.class)) {
                                predicates.add(word, w -> Expressions.numberPath(Integer.class, qEntity, field.getName())
                                        .eq(Integer.parseInt(w)));
                            } else if (fieldType.equals(Double.class)) {
                                predicates.add(word, w -> Expressions.numberPath(Double.class, qEntity, field.getName())
                                        .eq(Double.parseDouble(w)));
                            }
                        }
                    }
                }
            }
        }

        return predicates.buildOr();
    }

    private boolean isNumeric(String str) {
        try {
            Double.parseDouble(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
