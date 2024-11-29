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
@Table(name = "Специальности")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Speciality {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotBlank
    @Column(name = "Название_специальности")
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "speciality", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Group> groups;
}
