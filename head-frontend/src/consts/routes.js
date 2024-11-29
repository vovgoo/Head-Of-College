const ROUTES = {
    USER_ROUTES: "/*",
    ADMIN_ROUTES: "/admin/*",
    HOME: "/",
    LOGIN: "/login",
    TOPICS: "/topics",
    DASHBOARD: "/dashboard",
    TABLES: "/tables/:table",
    TABLES_INSERT: "/tables/insert/:table",
    TABLES_UPDATE: "/tables/update/:table/:row",
    INFO_ABOUT_ROW: "/tables/:table/:row",
    ARCHIVE: "/archive",
};

export default ROUTES;
