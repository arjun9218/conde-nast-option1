import {
    SET_DARK_MODE,
    SET_API_TOKEN,
    SET_NEWS,
    SET_CONFIG_DATA,
    SET_NEXT_PAGE,
    SET_SEARCH_FILTER,
    SET_LOADER_STATE
} from './constants';
import * as apis from '../common/constants';
import axios from 'axios';

// This is where all the API calls to node server is being handled.
// Once the call is successful, the response will then be dispatched and the state will be set in the store.

export const setDarkMode = (dispatch, isDark) => {
    dispatch({ type: SET_DARK_MODE, payload: isDark });
}

export const getApiToken = (dispatch) => {
    const url =
        apis.API_ENDPOINT +
        apis.API_GET_TOKEN;
    axios.get(url)
        .then(res => {
            if (res.status === 200) {
                dispatch({ type: SET_API_TOKEN, payload: res.data });
            } else {
                dispatch({ type: SET_API_TOKEN, payload: '' });
            }
        })
        .catch(err => {
            dispatch({ type: SET_API_TOKEN, payload: '' });
            console.error('Error occurred while trying to fetch ApiToken', err);
        });
};

export const setApiToken = (dispatch, apiToken) => {
    const url =
        apis.API_ENDPOINT +
        apis.API_SET_TOKEN;
    const config = {
        headers: {
            Authorization: apiToken
        }
    };
    axios.post(url, {}, config)
        .then(res => {
            if (res.status === 200) {
                dispatch({ type: SET_API_TOKEN, payload: apiToken });
            } else {
                dispatch({ type: SET_API_TOKEN, payload: '' });
            }
        })
        .catch(err => {
            dispatch({ type: SET_API_TOKEN, payload: '' });
            console.error('Error occurred while trying to set ApiToken', err);
        });
}

export const getConfigData = (dispatch) => {
    const url =
        apis.API_ENDPOINT +
        apis.API_GET_CONFIG;
    axios.get(url)
        .then(res => {
            if (res.status === 200) {
                dispatch({ type: SET_CONFIG_DATA, payload: res.data });
            } else {
                dispatch({ type: SET_CONFIG_DATA, payload: {} });
            }
        })
        .catch(err => {
            dispatch({ type: SET_CONFIG_DATA, payload: {} });
            console.error('Error occurred while trying to get config data', err);
        });
}

export const setSearchFilter = (dispatch, searchFilter) => {
    dispatch({ type: SET_SEARCH_FILTER, payload: searchFilter });
}

export const getLatestNews = (dispatch, queryParams) => {
    dispatch({ type: SET_LOADER_STATE, payload: true });
    let url =
        apis.API_ENDPOINT +
        apis.API_GET_NEWS;
    if (queryParams) {
        if (queryParams.page) {
            url += '?page=' + queryParams.page + '&';
        }
        if (queryParams.keyword && queryParams.keyword.length) {
            url += 'keyword=' + queryParams.keyword + '&';
        }
        if (queryParams.country && queryParams.country.length) {
            if (url.indexOf('?') === -1) {
                url += '?';
            }
            url += 'country=' + queryParams.country + '&';
        }
        if (queryParams.language && queryParams.language.length) {
            if (url.indexOf('?') === -1) {
                url += '?';
            }
            url += 'language=' + queryParams.language;
        }
    }
    axios.get(url)
        .then(res => {
            if (res.status === 200 && queryParams.page > 1) {
                dispatch({ type: SET_NEXT_PAGE, payload: res.data });
            } else if (res.status === 200 && queryParams.page === 1) {
                dispatch({ type: SET_NEWS, payload: res.data });
            } else {
                dispatch({ type: SET_NEWS, payload: {} });
            }
        })
        .catch(err => {
            if (queryParams.page === 1) {
                dispatch({ type: SET_NEWS, payload: {} });
            }
            if (err && err.response && err.response.status === 401) {
                dispatch({ type: SET_API_TOKEN, payload: '' });
            }
            console.error('Error occurred while trying to get latest news', err);
        }).finally(() => {
            dispatch({ type: SET_LOADER_STATE, payload: false });
        });
}