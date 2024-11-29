package by.vovgoo.Head.controller;

import by.vovgoo.Head.dto.pages.InfoAboutRow.InfoAboutRow;
import by.vovgoo.Head.dto.pages.InsertUpdatePage.InsertUpdatePage;
import by.vovgoo.Head.dto.pages.NotesPage.NotesPage;
import by.vovgoo.Head.filters.TablesFilter;
import by.vovgoo.Head.dto.pages.BurgerMenu.BurgerMenu;
import by.vovgoo.Head.dto.pages.Dashboard.Dashboard;
import by.vovgoo.Head.dto.pages.TablePage.TablePage;
import by.vovgoo.Head.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/teacher/")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @GetMapping("/burgerMenu")
    public BurgerMenu getBurgerMenu() {
        return teacherService.getBurgerMenu();
    }

    @GetMapping("/dashboard")
    public Dashboard getDashboard() {
        return teacherService.getDashboard();
    }

    @GetMapping("/notes")
    public NotesPage getNotesPage(Pageable pageable, String search) {
        return teacherService.getNotesPage(pageable, search);
    }

    @GetMapping("/tables/{tableName}")
    public TablePage getTablePage(@PathVariable String tableName, TablesFilter tablesFilter, Pageable pageable) {
        return teacherService.getTablePage(tableName, tablesFilter, pageable);
    }

    @GetMapping("/tables/{tableName}/{rowId}")
    public InfoAboutRow getInfoAboutRow(@PathVariable String tableName, @PathVariable Long rowId) {
        return teacherService.getInfoAboutRow(tableName,rowId);
    }

    @GetMapping("/tables/insert/{tableName}")
    public InsertUpdatePage getInsertPage(@PathVariable String tableName) {
        return teacherService.getInsertPage(tableName);
    }

    @GetMapping("/tables/update/{tableName}/{rowId}")
    public InsertUpdatePage getUpdatePage(@PathVariable String tableName, @PathVariable Long rowId) {
        return teacherService.getUpdatePage(tableName, rowId);
    }

    @GetMapping("/tables/search/{tableName}/{search}")
    public Map<Long, String> searchInTableByParam(@PathVariable String tableName, @PathVariable String search) {
        return teacherService.searchInTableByParam(tableName, search);
    }

    @GetMapping("/tables/search/{tableName}/")
    public Map<Long, String> searchInTableByParam(@PathVariable String tableName) {
        return teacherService.searchInTableByParam(tableName, "");
    }

    @PostMapping("/tables/insert/{tableName}")
    public Map<String, Object> insertTable(@PathVariable String tableName, @RequestBody Map<String, Object> entity) {
        return teacherService.insertIntoTable(tableName, entity);
    }

    @PostMapping("/tables/update/{tableName}/{rowId}")
    public Map<String, Object> updateTable(@PathVariable String tableName, @PathVariable Long rowId, @RequestBody Map<String, Object> entity) {
        return teacherService.updateTable(tableName, rowId, entity);
    }

    @PostMapping("/tables/delete/{tableName}/{rowId}")
    public void deleteTable(@PathVariable String tableName, @PathVariable Long rowId) {
        teacherService.deleteTable(tableName, rowId);
    }

    @GetMapping("/tables/download/{tableName}")
    public ResponseEntity<InputStreamResource> downloadTable(@PathVariable String tableName) {
        return teacherService.downloadTable(tableName);
    }
}
