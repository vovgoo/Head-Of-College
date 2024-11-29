package by.vovgoo.Head.service;

import by.vovgoo.Head.dto.pages.BurgerMenu.BurgerMenu;
import by.vovgoo.Head.dto.pages.Dashboard.Dashboard;
import by.vovgoo.Head.dto.pages.InfoAboutRow.InfoAboutRow;
import by.vovgoo.Head.dto.pages.InsertUpdatePage.InsertUpdatePage;
import by.vovgoo.Head.dto.pages.NotesPage.NotesPage;
import by.vovgoo.Head.dto.pages.TablePage.TablePage;
import by.vovgoo.Head.filters.TablesFilter;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface TeacherService {

    BurgerMenu getBurgerMenu();

    TablePage getTablePage(String tableName, TablesFilter tablesFilter, Pageable pageable);

    Dashboard getDashboard();

    InsertUpdatePage getInsertPage(String tableName);

    InsertUpdatePage getUpdatePage(String tableName, Long rowId);

    InfoAboutRow getInfoAboutRow(String tableName, Long rowId);

    Map<Long, String> searchInTableByParam(String tableName, String param);

    Map<String, Object> insertIntoTable(String tableName, Map<String, Object> entity);

    Map<String, Object> updateTable(String tableName, Long rowId, Map<String, Object> entity);

    void deleteTable(String tableName, Long rowId);

    NotesPage getNotesPage(Pageable pageable, String search);

    ResponseEntity<InputStreamResource> downloadTable(String tableName);
}
