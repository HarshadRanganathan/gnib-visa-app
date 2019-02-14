const _ = require('lodash');
const https = require('https');
const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');
const querystring = require('querystring');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const constants = require('./constants');

const ST_PATH = 'Website/AMSREG/AMSRegWeb.nsf';
const ROOT_URL = `https://burghquayregistrationoffice.inis.gov.ie/${ST_PATH}`;
const HEADER_REFERER_URL = 'https://burghquayregistrationoffice.inis.gov.ie/Website/AMSREG/AMSRegWeb.nsf/AppSelect?OpenForm'

const CATEGORIES = [
    { category: 'All' },
    { category: 'Work' }, 
    { category: 'Study' },
    { category: 'Other' }
];
const TYPES = [
    { type: 'New' },
    { type: 'Renewal' }
];

const db = low(new FileSync(`${constants.PAGE_KEY}.json`));
db.defaults({"pageKey":"k=90FD6DBC0B02392D98E0653E4B5897FB&p=278BA69D48412C6AF12A10949E0AD724"}).write();

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

async function getPageKey() {
    let pageResponse = await axios.get(`${ROOT_URL}/AppSelect?OpenForm`, { httpsAgent });
    let $ = cheerio.load(pageResponse.data);
    let k = $('#k').val();
    let p = $('#p').val();
    return `k=${k}&p=${p}`;
}

function isKeyExpired(data) {
    if(data && data['error'] && _.includes(data.error, 'reloading')) {       
        return true;
    }
    return false;
}

function axiosInterceptors() { 
    axios.interceptors.response.use(async (response) => {
        if(isKeyExpired(response.data)) {
            const pageKey = await getPageKey();            
            db.set(`${constants.PAGE_KEY}`, pageKey).write();
            
            // replace url with refreshed page key
            const config = response.config;
            config.url = config.url.replace(/(k=(\d+\w+|\w+\d+)+)|(&p=(\d+\w+|\w+\d+)+)/g,'') + pageKey;
            return axios.request(response.config);
        } 
        return response;
    }, (error) => {
        return Promise.reject(error);
    });
}

function payloadTransformer(payload) {
    let response = {};
    _.map(payload, (payload) => {        
        const { config, data } = payload;
        const { cat, typ } = querystring.parse(url.parse(config.url).query);
        response = _.merge(response, { [cat]: { [typ]: data} });
    });
    return response;
}

function requestAppts(pageKey) {
    return _.flatMap(CATEGORIES, ({category}) => {
        return _.map(TYPES, ({type}) => {
            const URL = `${ROOT_URL}/(getAppsNear)?readform&cat=${category}&sbcat=All&typ=${type}&${pageKey}`;            
            return axios.get(URL, { httpsAgent, headers: { Referer: HEADER_REFERER_URL } });
        });
    });
}

async function fetchGnibAppointmentAvailDts() {
    try {
        const pageKey = db.get(`${constants.PAGE_KEY}`).value();
        const payload = await axios.all(requestAppts(pageKey));
        return payloadTransformer(payload);
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    CATEGORIES,
    TYPES,
    fetchGnibAppointmentAvailDts,
    axiosInterceptors
}