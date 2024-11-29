package by.vovgoo.Head.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Темы_дипломных_работ")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopicsOfDiplomaTheses {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotBlank
    @Column(name = "Фамилия")
    private String surname;

    @NotNull
    @NotBlank
    @Column(name = "Имя")
    private String name;

    @NotNull
    @NotBlank
    @Column(name = "Отчество")
    private String fathername;

    @NotNull
    @Column(name = "Группа")
    private String group;

    @NotNull
    @NotBlank
    @Column(name = "Название_темы")
    private String description;

    @NotNull
    @Column(name = "Год")
    private Integer year;
}
