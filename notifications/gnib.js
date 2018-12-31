const _ = require('lodash');
const https = require('https');
const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');
const querystring = require('querystring');

const ST_PATH = 'Website/AMSREG/AMSRegWeb.nsf';
const ROOT_URL = `https://burghquayregistrationoffice.inis.gov.ie/${ST_PATH}`;

const CATEGORIES = [
    { category: 'Work' }, 
    { category: 'Study' },
    { category: 'Other' }
];
const TYPES = [
    { type: 'New' },
    { type: 'Renewal' }
];

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

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
            return axios.get(URL, { httpsAgent });
        });
    });
}

async function getPageKey() {
    let pageResponse = await axios.get(`${ROOT_URL}/AppSelect?OpenForm`, { httpsAgent });
    let $ = cheerio.load(pageResponse.data);
    let k = $('#k').val();
    let p = $('#p').val();
    return `k=${k}&p=${p}`;
}

async function fetchGnibAppointmentAvailDts() {
    try {
        const pageKey = await getPageKey();
        const payload = await axios.all(requestAppts(pageKey));
        const appts = payloadTransformer(payload);
    } catch (err) {
        console.log(err);
    }
}