package by.vovgoo.Head.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Диапазон_стипендий")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Scholarship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "Нижний_порог")
    private Double lower;

    @NotNull
    @Column(name = "Верхний_порог")
    private Double upper;

    @NotNull
    @Column(name = "Сумма")
    private Double price;
}
