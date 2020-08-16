import {
    SET_DARK_MODE,
    SET_API_TOKEN,
    SET_NEWS,
    SET_CONFIG_DATA,
    SET_NEXT_PAGE,
    SET_SEARCH_FILTER,
    SET_LOADER_STATE
} from './constants';

// This is a reducer for the state in store

export const newsStateReducer = (state, action) => {
    switch(action.type) {
        case SET_DARK_MODE:
            return { ...state, darkMode: action.payload };
        case SET_API_TOKEN:
            return { ...state, apiToken: action.payload };
        case SET_NEWS:
            return { ...state, latestNews: action.payload };
        case SET_CONFIG_DATA:
            return { ...state, configData: action.payload };
        case SET_NEXT_PAGE:
            if (action.payload && action.payload.articles) {
                return { ...state, latestNews: { ...state.latestNews, articles: [ ...state.latestNews.articles, ...action.payload.articles] }};
            }
            break;
        case SET_SEARCH_FILTER:
            return { ...state, searchFilter: action.payload };
        case SET_LOADER_STATE:
            return { ...state, loaderState: action.payload };
        default:
            return;
    }
}