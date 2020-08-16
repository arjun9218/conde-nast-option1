//*************** Constants ****************//

/* ### APIs ###*/
const API_GET_NEWS = '/news/getLatestNews';
const API_SET_TOKEN = '/news/setApiToken';
const API_GET_TOKEN = '/news/getApiToken';
const API_GET_CONFIG = '/news/getConfigData';

const express = require("express");
const router = express.Router();
const newsApiHandler = require('./news-api');
const utilities = require('./utils');

router.route(API_GET_NEWS)
    .get(newsApiHandler.getLatestNews);

router.route(API_SET_TOKEN)
    .post(newsApiHandler.initializeNewsApi);

router.route(API_GET_TOKEN)
    .get(utilities.getApiToken);

router.route(API_GET_CONFIG)
    .get(utilities.getConfigData);

module.exports = router;
