package by.vovgoo.Head.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "Взыскания")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Sanctions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_студента")
    private Students students;

    @NotNull
    @NotBlank
    @Column(name = "Описание")
    private String description;

    @NotNull
    @Column(name = "Дата_начала")
    private LocalDateTime startDate;

    @NotNull
    @Column(name = "Дата_конца")
    private LocalDateTime endDate;
}
