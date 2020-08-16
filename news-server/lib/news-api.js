const NewsAPI = require('newsapi');
const config = require('../config/config.json');

// initialize the newsApi global variable
function initializeNewsApi(req, res) {
    api_token = req.header('Authorization');
    newsApi = new NewsAPI(api_token);
    res.status(200).send({ message: 'Successfully initialized NewsAPI!!' });
}

// function to get the news from newsApi node js library
function getLatestNews(req, res) {
    const queryParams = {};
    if (req.query) {
        if (req.query.keyword && req.query.keyword.length) {
            queryParams.q = req.query.keyword;
        }
        if (req.query.country && req.query.country.length) {
            queryParams.country = req.query.country;
        } else {
            queryParams.country = config.defaultCountry;
        }
        if (req.query.language && req.query.language.length) {
            queryParams.language = req.query.language;
        } else {
            queryParams.language = config.defaultLanguage;
        }
        if (req.query.page) {
            queryParams.page = req.query.page;
        }
        if (req.query.pageSize) {
            queryParams.pageSize = req.query.pageSize;
        } else {
            queryParams.pageSize = config.pageSize;
        }
    }
    if (newsApi) {
        newsApi.v2.topHeadlines(queryParams)
            .then(response => {
                res.status(200).send(response);
            }).catch(err => {
                // if error consists apiKeyInvalid then apiKey is invalid, hence resetting newsApi global variable
                if (err && err.name && err.name.indexOf('apiKeyInvalid') !== -1) {
                    newsApi = null;
                    api_token = null;
                }
                res.status(401).send({ message: 'Invalid token', error: err });
            });
    } else {
        res.status(401).send({ message: 'Token not initialized, please initialize the token and try again!!' });
    }
}

//*************** EXPORTED PROPERTIES *****************//
exports.initializeNewsApi = initializeNewsApi;
exports.getLatestNews = getLatestNews;
