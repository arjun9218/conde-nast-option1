import React, { useReducer, createContext } from 'react';
import { newsStateReducer } from './reducers';

export const NewsContext = createContext();

// This is the store which the whole App is subscribed to
export default function NewsStore({ children }) {
    const initialNewsState = {
        darkMode: false,
        apiToken: '',
        latestNews: {},
        configData: {},
        searchFilter: {},
        loaderState: false
    };

    const [newsState, newsDispatch] = useReducer(
        newsStateReducer,
        initialNewsState
    );

    return (
        <NewsContext.Provider value={{ newsState, newsDispatch }}>
            {children}
        </NewsContext.Provider>
    );
}