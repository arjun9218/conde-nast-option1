import React, { useState, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { NewsContext } from '../store/NewsStore';
import { setApiToken, getLatestNews, setSearchFilter } from '../store/actions';
import {
    TextField,
    Button
} from '@material-ui/core';
import logoDark from '../assets/conde-nast-logo-black.svg';
import logoLight from '../assets/conde-nast-logo-white.svg';
import LatestNews from '../components/news/latestNews/LatestNews';
import { useStyles } from './styles';

export default function Layout() {
    const classes = useStyles();
    const { newsState, newsDispatch } = useContext(NewsContext);
    const [token, setToken] = useState('');
    const [fetchingNews, setFetchingNews] = useState(false);

    const handleFormChange = (event) => {
        setToken(event.target.value);
    };

    // Calling the action setApiToken which in-turn calls the setApiToken post call to node server
    const handleSubmit = () => {
        setApiToken(newsDispatch, token);
    };

    const keyPressed = (event) => {
        const code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            handleSubmit();
        } 
    }

    // infinite scroll
    const loadMoreNews = (event, page) => {
        if (newsState
            && newsState.apiToken
            && newsState.latestNews
            && newsState.latestNews.articles
            && newsState.latestNews.articles.length
            && newsState.latestNews.totalResults
            && newsState.searchFilter
            && newsState.searchFilter.page) {
            if (event.target.scrollTop > event.target.scrollHeight - 1500) {
                if (newsState.latestNews.articles.length < newsState.latestNews.totalResults && !fetchingNews) {
                    setFetchingNews(true);
                    setTimeout(() => {
                        setFetchingNews(false);
                    }, 1000);
                    getLatestNews(newsDispatch, {
                        ...newsState.searchFilter,
                        page: page + 1
                    });
                    setSearchFilter(newsDispatch, {
                        ...newsState.searchFilter,
                        page: page + 1
                    });
                }
            }
        }
    }

    // const setMode = () => {
    //     if (newsState.darkMode) {
    //         setDarkMode(newsDispatch, false);
    //     } else {
    //         setDarkMode(newsDispatch, true);
    //     }
    // };

    return (
        <div onScroll={e => loadMoreNews(e, newsState.searchFilter.page)} className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                color="secondary"
                className={classes.appBar}
                elevation={0}
            >
                <Toolbar className={classes.toolbarItems}>
                    <img alt={'Conde Nast'} className={classes.logo} src={newsState.darkMode ? logoLight : logoDark} />
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {/* <Typography component="div" className={classes.darkMode}>
                    <FormControlLabel
                        checked={newsState.darkMode}
                        onChange={setMode}
                        control={<Switch color="primary" />}
                        label="Dark mode"
                        labelPlacement="start"
                    />
                </Typography> */}
                {!newsState.apiToken ?
                    <form className={classes.apiTokenForm} noValidate autoComplete="off">
                        <TextField
                            InputProps={{
                                classes: { root: classes.textField }
                            }}
                            id="apiToken"
                            label="API Token"
                            variant="outlined"
                            value={token}
                            InputLabelProps={{ shrink: token !== '' ? true : false }}
                            onChange={event => handleFormChange(event)}
                            onKeyPress={keyPressed}
                        />
                        <Button
                            className={classes.textField}
                            variant="outlined"
                            component="label"
                            color="inherit"
                            onClick={handleSubmit}
                            disabled={token === ''}
                        >
                            Submit
                        </Button>
                    </form>
                    :
                    <LatestNews />
                }
            </main>
        </div>
    );
}