const config = require('../config/config.json');

// function to get the ApiToken
function getApiToken(req, res) {
    if (api_token && api_token.length) {
        res.status(200).send({ apiToken: api_token });
    } else {
        res.status(404).send();
    }
}

// function to get the config data
function getConfigData(req, res) {
    if (config) {
        const configData = {};
        if (config.defaultLanguage) {
            configData.defaultLaunguage = config.defaultLanguage;
        }
        if (config.defaultCountry) {
            configData.defaultCountry = config.defaultCountry;
        }
        if (config.countries && config.countries.length) {
            configData.countries = config.countries;
        }
        res.status(200).send(configData);
    } else {
        res.status(404).send();
    }
}

//*************** EXPORTED PROPERTIES *****************//
exports.getApiToken = getApiToken;
exports.getConfigData = getConfigData;
