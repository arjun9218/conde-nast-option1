import React, { useState, useContext, useEffect } from 'react';
import {
    TextField,
    Button,
    Typography,
    Paper,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CssBaseline
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { NewsContext } from '../../../store/NewsStore';
import { getLatestNews, setSearchFilter } from '../../../store/actions';
import NewsCard from '../newsCard/NewsCard';
import { useStyles } from './styles';

export default function LatestNews() {
    const classes = useStyles();
    const { newsState, newsDispatch } = useContext(NewsContext);
    const [searchFilters, setSearchFilters] = useState({
        keyword: '',
        page: 1,
        country: newsState && newsState.configData && newsState.configData.defaultCountry ? newsState.configData.defaultCountry : ''
    });

    // updating search filters and fetching the news on first load
    useEffect(() => {
        if (newsState.configData && newsState.configData.defaultCountry) {
            setSearchFilters({
                ...searchFilters,
                country: newsState.configData.defaultCountry
            });
            setSearchFilter(newsDispatch, {
                ...searchFilters,
                country: newsState.configData.defaultCountry
            });
        }
        getLatestNews(newsDispatch, searchFilters);
    }, [newsState && newsState.configData]);

    const handleFormChange = (field, event) => {
        setSearchFilters({
            ...searchFilters,
            page: 1,
            [field]: event.target.value
        });
    };

    const handleSubmit = () => {
        setSearchFilter(newsDispatch, searchFilters);
        getLatestNews(newsDispatch, searchFilters);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Paper elevation={3} className={classes.searchFiltersPaper}>
                <form className={classes.searchFilters} noValidate autoComplete="off">
                    <TextField
                        id="keyword"
                        className={classes.textField}
                        label="Keyword"
                        value={searchFilters.keyword}
                        onChange={event => handleFormChange('keyword', event)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl className={classes.textField}>
                        <InputLabel id="country-label">Country</InputLabel>
                        <Select
                            labelId="country"
                            id="country"
                            value={searchFilters.country}
                            onChange={event => handleFormChange('country', event)}
                        >
                            <MenuItem value="">
                                <em>--Select--</em>
                            </MenuItem>
                            {newsState && newsState.configData && newsState.configData.countries && newsState.configData.countries.length && newsState.configData.countries.map(country => {
                                return (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label + ' (' + country.id + ')'}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <Button
                        className={classes.button}
                        variant="outlined"
                        component="label"
                        color="inherit"
                        onClick={handleSubmit}
                    >
                        Search
                    </Button>
                </form>
            </Paper>
            {newsState && newsState.latestNews && newsState.latestNews.articles && newsState.latestNews.articles.length ?
                <div className={classes.newsGrid}>
                    {newsState.latestNews.articles.map(article => {
                        return <NewsCard key={article.title} article={article} />
                    })}
                </div>
                : null}
            {newsState.loaderState ?
                <Typography className={classes.loading}>Loading...</Typography>
            : null}
        </div>
    );
}