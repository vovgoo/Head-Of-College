package by.vovgoo.Head.config;

import by.vovgoo.Head.entity.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.*;

@Configuration
public class TableConfig {

    @Bean
    public Map<String, List<String>> tableSearchParams() {
        return Map.of(
                "группы", List.of("name"),
                "специальности", List.of("name"),
                "студенты", List.of("surname", "name", "fathername")
        );
    }

    @Bean
    public Map<String, TableInfo> tableInfos() {
        return Map.of(
                "надбавки", TableInfo.builder()
                        .fields(new ArrayList<>(Arrays.asList(
                                "id",
                                "students",
                                "title",
                                "price",
                                "startDate",
                                "endDate"
                        )))
                        .specialFields(new ArrayList<>())
                        .build(),
                "группы", TableInfo.builder()
                        .fields(new ArrayList<>(Arrays.asList(
                                "id",
                                "name",
                                "courseNumber",
                                "speciality"
                        )))
                        .specialFields(new ArrayList<>())
                        .build(),
                "заметки", TableInfo.builder()
                        .fields(new ArrayList<>(Arrays.asList(
                                "id",
                                "title",
                                "text",
                                "createTime",
                                "noteAccess"
                                )))
                        .specialFields(new ArrayList<>())
                        .build(),
                "взыскания", TableInfo.builder()
                        .fields(new ArrayList<>(Arrays.asList(
                                "id",
                                "students",
                                "description",
                                "startDate",
                                "endDate"
                        )))
                        .specialFields(new ArrayList<>())
                        .build(),
                "диапазон_стипендий", TableInfo.builder()
                        .fields(new ArrayList<>(Arrays.asList(
                                "id",
                                "lower",
                                "upper",
                                "price"
                        )))
                        .specialFields(new ArrayList<>())
                        .build(),
                "специальности", TableInfo.builder()
                        .fields(new ArrayList<>(Arrays.asList(
                                "id",
                                "name"
                        )))
                        .specialFields(new ArrayList<>())
                        .build(),
                "студенты", TableInfo.builder()
                        .fields(new ArrayList<>(Arrays.asList(
                                "id",
                                "image",
                                "surname",
                                "name",
                                "fathername",
                                "group",
                                "comment",
                                "averageBall"
                        )))
                        .specialFields(new ArrayList<>(Arrays.asList(
                                SpecialFields.builder()
                                        .name("allowances")
                                        .query("SELECT MAX(сумма) FROM надбавки WHERE id_студента = :id")
                                        .parameters(new ArrayList<>(List.of(
                                                "id"
                                        )))
                                        .build(),
                                SpecialFields.builder()
                                        .name("sanctions")
                                        .query("SELECT COUNT(*) FROM взыскания WHERE id_студента = :id")
                                        .parameters(new ArrayList<>(List.of(
                                                "id"
                                        )))
                                        .build(),
                                SpecialFields.builder()
                                        .name("scholarship")
                                        .query("SELECT сумма + COALESCE((SELECT MAX(сумма) FROM надбавки WHERE id_студента = :id), 0) FROM диапазон_стипендий WHERE :averageBall BETWEEN нижний_порог AND верхний_порог")
                                        .parameters(new ArrayList<>(Arrays.asList(
                                                "id",
                                                "averageBall"
                                        )))
                                        .build()
                                )))
                        .build(),
                "темы_дипломных_работ", TableInfo.builder()
                        .fields(new ArrayList<>(Arrays.asList(
                                "id",
                                "surname",
                                "name",
                                "fathername",
                                "group",
                                "description",
                                "year"
                        )))
                        .specialFields(new ArrayList<>())
                        .build(),
                "пользователи", TableInfo.builder()
                        .fields(new ArrayList<>(Arrays.asList(
                                "id",
                                "image",
                                "surname",
                                "name",
                                "fathername",
                                "role",
                                "login"
                        )))
                        .specialFields(new ArrayList<>())
                        .build()
        );
    }


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class TableInfo {
        @Builder.Default
        List<String> fields = new ArrayList<>();

        @Builder.Default
        List<SpecialFields> specialFields = new ArrayList<>();
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SpecialFields {
        private String name;

        private String query;

        private List<String> parameters;
    }
}
