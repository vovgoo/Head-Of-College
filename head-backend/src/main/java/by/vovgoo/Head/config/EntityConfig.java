package by.vovgoo.Head.config;

import by.vovgoo.Head.dto.pages.TablePage.ColumnInfo;
import by.vovgoo.Head.entity.*;
import com.querydsl.core.types.dsl.EntityPathBase;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Configuration
public class EntityConfig {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ClassFieldPair {
        private String className;
        private String fieldName;
    }

    public List<ClassFieldPair> getClassWithFields(Object targetClass) {
        List<ClassFieldPair> result = new ArrayList<>();

        for (Map.Entry<Object, String> entry : ClassPath().entrySet()) {
            Class<?> clazz = (Class<?>) entry.getKey();

            for (Field field : clazz.getDeclaredFields()) {
                if (field.getType().equals(targetClass)) {
                    result.add(new ClassFieldPair(entry.getValue(), field.getName()));
                }
            }
        }

        return result;
    }


    @Bean
    public Map<Object, String> ClassPath() {
        return Map.of(
                Allowances.class, "надбавки",
                Group.class,"группы",
                Note.class,"заметки",
                Sanctions.class,"взыскания",
                Scholarship.class,"диапазон_стипендий",
                Speciality.class,"специальности",
                Students.class,"студенты",
                TopicsOfDiplomaTheses.class,"темы_дипломных_работ",
                User.class,"пользователи"
        );
    }

    @Bean
    public Map<String, Object> ClassDefaultPath() {
        return Map.of(
                "надбавки", Allowances.class,
                "группы", Group.class,
                "заметки", Note.class,
                "взыскания", Sanctions.class,
                "диапазон_стипендий", Scholarship.class,
                "специальности", Speciality.class,
                "студенты", Students.class,
                "темы_дипломных_работ", TopicsOfDiplomaTheses.class,
                "пользователи", User.class
        );
    }

    @Bean
    public Map<String, EntityPathBase<?>> QEntityPaths() {
        return Map.of(
                "надбавки", QAllowances.allowances,
                "группы", QGroup.group,
                "заметки", QNote.note,
                "взыскания", QSanctions.sanctions,
                "диапазон_стипендий", QScholarship.scholarship,
                "специальности", QSpeciality.speciality,
                "студенты", QStudents.students,
                "темы_дипломных_работ", QTopicsOfDiplomaTheses.topicsOfDiplomaTheses,
                "пользователи", QUser.user
        );
    }

    @Bean
    public Map<String, List<ColumnInfo>> entityColumnInfoMap() {
        return Map.of(
                "надбавки", getAllowancesColumnInfo(),
                "группы", getGroupColumnInfo(),
                "заметки", getNoteColumnInfo(),
                "взыскания", getSanctionsColumnInfo(),
                "диапазон_стипендий", getScholarshipColumnInfo(),
                "специальности", getSpecialityColumnInfo(),
                "студенты", getStudentsColumnInfo(),
                "темы_дипломных_работ", getTopicsOfDiplomaThesesColumnInfo(),
                "пользователи", getUserColumnInfo()
        );
    }

    private List<ColumnInfo> getAllowancesColumnInfo() {
        return List.of(
                new ColumnInfo("id_студента", "students", "Students"),
                new ColumnInfo("Причина_надбавки", "title", "String"),
                new ColumnInfo("Сумма", "price", "Double"),
                new ColumnInfo("Дата_начала", "startDate", "LocalDateTime"),
                new ColumnInfo("Дата_конца", "endDate", "LocalDateTime")
        );
    }

    private List<ColumnInfo> getGroupColumnInfo() {
        return List.of(
                new ColumnInfo("Название_группы", "name", "String"),
                new ColumnInfo("Номер_курса", "courseNumber", "Long"),
                new ColumnInfo("id_специальности", "speciality", "Speciality")
        );
    }

    private List<ColumnInfo> getNoteColumnInfo() {
        return List.of(
                new ColumnInfo("Заголовок", "title", "String"),
                new ColumnInfo("Содержание", "text", "String"),
                new ColumnInfo("Дата_создания", "createTime", "LocalDateTime"),
                new ColumnInfo("Режим_доступа", "noteAccess", "NoteAccess")
        );
    }

    private List<ColumnInfo> getSanctionsColumnInfo() {
        return List.of(
                new ColumnInfo("id_студента", "students", "Students"),
                new ColumnInfo("Описание", "description", "String"),
                new ColumnInfo("Дата_начала", "startDate", "LocalDateTime"),
                new ColumnInfo("Дата_конца", "endDate", "LocalDateTime")
        );
    }

    private List<ColumnInfo> getScholarshipColumnInfo() {
        return List.of(
                new ColumnInfo("Нижний_порог", "lower", "Double"),
                new ColumnInfo("Верхний_порог", "upper", "Double"),
                new ColumnInfo("Сумма", "price", "Double")
        );
    }

    private List<ColumnInfo> getSpecialityColumnInfo() {
        return List.of(
                new ColumnInfo("Название_специальности", "name", "String")
        );
    }

    private List<ColumnInfo> getStudentsColumnInfo() {
        return List.of(
                new ColumnInfo("Фото_профиля", "image", "String"),
                new ColumnInfo("Фамилия", "surname", "String"),
                new ColumnInfo("Имя", "name", "String"),
                new ColumnInfo("Отчество", "fathername", "String"),
                new ColumnInfo("id_группы", "group", "Group"),
                new ColumnInfo("Комментарий_к_студенту", "comment", "String"),
                new ColumnInfo("Средний_балл", "averageBall", "Double"),
                new ColumnInfo("Сумма надбавки", "allowances", "Double"),
                new ColumnInfo("Дисциплинарные взыскания", "sanctions", "Double"),
                new ColumnInfo("Стипендия", "scholarship", "Double")
        );
    }

    private List<ColumnInfo> getTopicsOfDiplomaThesesColumnInfo() {
        return List.of(
                new ColumnInfo("Фамилия", "surname", "String"),
                new ColumnInfo("Имя", "name", "String"),
                new ColumnInfo("Отчество", "fathername", "String"),
                new ColumnInfo("Группа", "group", "String"),
                new ColumnInfo("Название_темы", "description", "String"),
                new ColumnInfo("Год", "year", "Integer")
        );
    }

    private List<ColumnInfo> getUserColumnInfo() {
        return List.of(
                new ColumnInfo("Фото_профиля", "image", "String"),
                new ColumnInfo("Фамилия", "surname", "String"),
                new ColumnInfo("Имя", "name", "String"),
                new ColumnInfo("Отчество", "fathername", "String"),
                new ColumnInfo("Роль", "role", "Role"),
                new ColumnInfo("Логин", "login", "String")
                //new ColumnInfo("Пароль", "password", "String")
        );
    }
}
