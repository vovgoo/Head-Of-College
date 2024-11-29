package by.vovgoo.Head.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "Студенты")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Students {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Фото_профиля")
    private String image;

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
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_группы")
    private Group group;

    @NotBlank
    @Column(name = "Комментарий_к_студенту")
    private String comment;

    @NotNull
    @Column(name = "Средний_балл")
    private Double averageBall;

    @JsonIgnore
    @OneToMany(mappedBy = "students", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Allowances> allowances;

    @JsonIgnore
    @OneToMany(mappedBy = "students", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sanctions> sanctions;
}
