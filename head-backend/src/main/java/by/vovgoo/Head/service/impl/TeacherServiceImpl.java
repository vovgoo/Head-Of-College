package by.vovgoo.Head.service.impl;

import by.vovgoo.Head.dto.auth.PageResponse;
import by.vovgoo.Head.dto.pages.BurgerMenu.BurgerMenu;
import by.vovgoo.Head.dto.pages.Dashboard.Dashboard;
import by.vovgoo.Head.dto.pages.Dashboard.DashboardUser;
import by.vovgoo.Head.dto.pages.InfoAboutRow.InfoAboutRow;
import by.vovgoo.Head.dto.pages.InsertUpdatePage.InsertUpdatePage;
import by.vovgoo.Head.dto.pages.NotesPage.NotesPage;
import by.vovgoo.Head.dto.pages.TablePage.TablePage;
import by.vovgoo.Head.entity.User;
import by.vovgoo.Head.entity.enums.Role;
import by.vovgoo.Head.filters.TablesFilter;
import by.vovgoo.Head.repository.TeacherRepository;
import by.vovgoo.Head.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.io.*;
import java.net.URI;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;

    private final RestTemplate restTemplate;

    @Value("${head-archivator.url}")
    private String archive_url;

    @Override
    public BurgerMenu getBurgerMenu() {
        User user = getCurrentUser();

        DashboardUser dashboardUser = DashboardUser.builder()
                .id(user.getId())
                .image(user.getImage())
                .surname(user.getSurname())
                .name(user.getName())
                .fathername(user.getFathername())
                .role(user.getRole())
                .login(user.getLogin())
                .build();

        List<String> tables = new ArrayList<>();

        if(user.getRole() == Role.ADMIN) {
            tables = teacherRepository.findAllTables();
        } else if(user.getRole() == Role.TEACHER) {
            tables.add("темы_дипломных_работ");
        }

        return BurgerMenu.builder()
                .tables(tables)
                .users(dashboardUser)
                .build();
    }

    @Override
    public TablePage getTablePage(String tableName, TablesFilter tablesFilter, Pageable pageable) {

        return TablePage.builder()
                .tableName(tableName)
                .countRows(teacherRepository.getCountRows(tableName).orElseThrow())
                .tableSize(teacherRepository.getSizeTable(tableName).orElseThrow())
                .columns(teacherRepository.getColumnInfo(tableName))
                .tableData(PageResponse.of(teacherRepository.findAll(tableName, pageable, tablesFilter)))
                .build();
    }

    @Override
    public Dashboard getDashboard() {
        User user = getCurrentUser();
        Dashboard dashboard = teacherRepository.getDashboards();
        DashboardUser dashboardUser = DashboardUser.builder()
                .id(user.getId())
                .image(user.getImage())
                .surname(user.getSurname())
                .name(user.getName())
                .fathername(user.getFathername())
                .role(user.getRole())
                .login(user.getLogin())
                .build();

        dashboard.setUsers(dashboardUser);
        return dashboard;
    }

    @Override
    public InfoAboutRow getInfoAboutRow(String tableName, Long rowId) {
        return InfoAboutRow.builder()
                .rowInfo(teacherRepository.getRowInfo(tableName, rowId))
                .build();
    }

    @Override
    public Map<Long, String> searchInTableByParam(String tableName, String param) {
        return teacherRepository.searchInTableByParam(tableName, param);
    }

    @Override
    public InsertUpdatePage getInsertPage(String tableName) {
        return InsertUpdatePage.builder()
                .columns(teacherRepository.getInsertPage(tableName))
                .build();
    }

    @Override
    public InsertUpdatePage getUpdatePage(String tableName, Long rowId) {
        return InsertUpdatePage.builder()
                .columns(teacherRepository.getUpdatePage(tableName, rowId))
                .build();
    }

    @Override
    public Map<String, Object> insertIntoTable(String tableName, Map<String, Object> entity) {
        return teacherRepository.insertIntoTable(tableName, entity);
    }

    @Override
    public Map<String, Object> updateTable(String tableName, Long rowId, Map<String, Object> entity) {
        return teacherRepository.updateTable(tableName, rowId, entity);
    }

    @Override
    public void deleteTable(String tableName, Long rowId) {
        teacherRepository.deleteTable(tableName, rowId);
    }

    @Override
    public NotesPage getNotesPage(Pageable pageable, String search) {
        return NotesPage.builder()
                .notes(PageResponse.of(teacherRepository.getNotesPage(pageable, getCurrentUser().getRole(), search)))
                .build();
    }

    @Override
    public ResponseEntity<InputStreamResource> downloadTable(String tableName) {

        String url = null;

        try {
            url = archive_url + "/download/" + URLEncoder.encode(tableName, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        URI uri = URI.create(url);

        byte[] fileBytes = restTemplate.getForObject(uri, byte[].class);

        if (fileBytes == null || fileBytes.length == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found");
        }

        InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(fileBytes));

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + tableName + ".xlsx\"")
                .body(resource);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof User) {
                return (User) principal;
            }
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Пользователь не аутентифицирован");
    }
}
