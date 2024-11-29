import axiosClient from './axiosClient';
import { TOPICS_ENDPOINT, LOGIN_ENDPOINT, TABLE_ENDPOINT, DASHBOARD_ENDPOINT, BURGERMENU_ENDPOINT, INSERT_ENDPOINT, UPDATE_ENDPOINT, IMAGES_ENDPOINT, INFO_ABOUT_ROW_ENDPOINT, SEARCH_DROWDOWN_ENDPOINT, INSERT_INTO_ENDPOINT, IMAGES_UPLOAD_ENDPOINT, UPDATE_INTO_ENDPOINT, DELETE_INTO_ENDPOINT, NOTES_ENDPOINT, DOWNLOAD_TABLE, GET_ARCHIVE_PAGE, ARCHIVE } from './endpoints';

export const fetchTopics = async (params = {}) => {
    const query = new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([, value]) => value !== null)));
    return await axiosClient.get(`${TOPICS_ENDPOINT}?${query}`);
};

export const fetchLogin = async ({username, password}) => {
    return await axiosClient.post(`${LOGIN_ENDPOINT}`, {login: username, password: password});
};

export const fetchTable = async (params = {}) => {
    const query = new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([, value]) => value !== null)));
    return await axiosClient.get(`${TABLE_ENDPOINT}${params.table}?${query}`);
};

export const fetchDashboard = async (params = {}) => {
    return await axiosClient.get(`${DASHBOARD_ENDPOINT}`);
};

export const fetchBurgerMenu = async (params = {}) => {
    return await axiosClient.get(`${BURGERMENU_ENDPOINT}`);
};

export const fetchNotes = async (params = {}) => {
    return await axiosClient.get(`${NOTES_ENDPOINT}?page=${params.page}&search=${params.search}`);
};

export const fetchInsert = async (params = {}) => {
    return await axiosClient.get(`${INSERT_ENDPOINT}${params.table}`);
};

export const fetchUpdate = async (params = {}) => {
    return await axiosClient.get(`${UPDATE_ENDPOINT}${params.table}/${params.row}`);
};

export const fetchImage = async (image) => {
    if(image === null || image === undefined) {
        return;
    }
    return await axiosClient.get(`${IMAGES_ENDPOINT}${image}`, { responseType: 'blob' });
};

export const fetchInfoAboutRow = async (params = {}) => {
    return await axiosClient.get(`${INFO_ABOUT_ROW_ENDPOINT}${params.table}/${params.row}`);
};

export const fetchSearchDropdown = async (params = {}) => {
    if(params.table === null) {
        return;
    }
    return await axiosClient.get(`${SEARCH_DROWDOWN_ENDPOINT}${params.table}/${params.params}`);
};

export const fetchInsertIntoTable = async ({table, params}) => {
    return await axiosClient.post(`${INSERT_INTO_ENDPOINT}${table}`, params);
};

export const fetchUpdateIntoTable = async ({table, row, params}) => {
    return await axiosClient.post(`${UPDATE_INTO_ENDPOINT}${table}/${row}`, params);
};

export const fetchDeteleIntoTable = async ({table, row}) => {
    return await axiosClient.post(`${DELETE_INTO_ENDPOINT}${table}/${row}`);
};

export const fetchImageUpload = async (params) => {
    return await axiosClient.post(`${IMAGES_UPLOAD_ENDPOINT}`, params, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export const fetchDownloadTable = async({table}) => {
    return await axiosClient.get(`${DOWNLOAD_TABLE}${table}`, { responseType: 'blob' })
}

export const fetchArchive = async(params) => {
    return await axiosClient.get(`${GET_ARCHIVE_PAGE}?page=${params.page}`)
}

export const fetchGetArchive = async({id}) => {
    return await axiosClient.get(`${ARCHIVE}/${id}`, { responseType: 'blob' })
}

export const fetchAddArchive = async() => {
    return await axiosClient.post(`${ARCHIVE}`)
}
