package by.vovgoo.Head.entity;

import by.vovgoo.Head.entity.enums.NoteAccess;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "Заметки")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "Заголовок",  columnDefinition = "TEXT")
    private String title;

    @NotNull
    @NotBlank
    @Column(name = "Содержание",  columnDefinition = "TEXT")
    private String text;

    @NotNull
    @Column(name = "Дата_создания")
    private LocalDateTime createTime;

    @NotNull
    @Column(name = "Режим_доступа")
    @Enumerated(EnumType.STRING)
    private NoteAccess noteAccess;
}
