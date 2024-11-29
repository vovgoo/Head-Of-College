package by.vovgoo.Head.repository;

import by.vovgoo.Head.dto.pages.Dashboard.Dashboard;
import by.vovgoo.Head.dto.pages.InfoAboutRow.TypeInfoRow;
import by.vovgoo.Head.dto.pages.InsertUpdatePage.InsertUpdateInfoColumns;
import by.vovgoo.Head.dto.pages.NotesPage.NotesPage;
import by.vovgoo.Head.dto.pages.TablePage.ColumnInfo;
import by.vovgoo.Head.entity.enums.Role;
import by.vovgoo.Head.filters.TablesFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface TeacherRepository {

    Optional<Double> getSizeTable(String tableName);

    Optional<Long> getCountRows(String tableName);

    List<String> findAllTables();

    Dashboard getDashboards();

    List<ColumnInfo> getColumnInfo(String tableName);

    Page<Map<String, Object>> findAll(String tableName, Pageable pageable, TablesFilter tablesFilter);

    Map<String, TypeInfoRow> getRowInfo(String tableName, Long rowId);

    List<InsertUpdateInfoColumns> getInsertPage(String tableName);

    List<InsertUpdateInfoColumns> getUpdatePage(String tableName, Long rowId);

    Map<Long, String> searchInTableByParam(String tableName, String param);

    Map<String, Object> insertIntoTable(String tableName, Map<String, Object> entity);

    Map<String, Object> updateTable(String tableName, Long rowId, Map<String, Object> entity);

    void deleteTable(String tableName, Long rowId);

    Page<NotesPage.NoteDto> getNotesPage(Pageable pageable, Role role, String search);
}
