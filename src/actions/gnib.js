import _ from "lodash";
import axios from "axios";
import cheerio from "cheerio";
import { emitRequestsProgress } from "./progress";

const ST_PATH = "Website/AMSREG/AMSRegWeb.nsf";
const ROOT_URL = `/gnib-proxy/${ST_PATH}`;
export const GNIB_APPOINTMENT_DATES = "GNIB_APPOINTMENT_DATES";
export const GNIB_API_ERROR = "GNIB_API_ERROR";
export const PAGE_KEY = "PAGE_KEY";
export const CATEGORIES = [{ category: "All" }];
export const TYPES = [{ type: "New" }];

function appts(responses) {
  return {
    type: GNIB_APPOINTMENT_DATES,
    payload: responses
  };
}

function requestAppts(pageKey) {
  return _.flatMap(CATEGORIES, ({ category }) => {
    return _.map(TYPES, ({ type }) => {
      const URL = `${ROOT_URL}/(getAppsNear)?readform&cat=${category}&sbcat=All&typ=${type}&${pageKey}`;
      return axios.get(URL);
    });
  });
}

export async function getPageKey() {
  let pageResponse = await axios.get(`${ROOT_URL}/AppSelect?OpenForm`);
  let $ = cheerio.load(pageResponse.data);
  let k = $("#k").val();
  let p = $("#p").val();
  return `k=${k}&p=${p}`;
}

export function fetchGnibAppointmentAvailDts(callback) {
  return dispatch => {
    emitRequestsProgress(dispatch);
    axios
      .all(requestAppts(sessionStorage.getItem(PAGE_KEY)))
      .then(responses => {
        if (callback) callback();
        dispatch(appts(responses));
      })
      .catch(err => {
        dispatch({
          type: GNIB_API_ERROR,
          error:
            "We are temporarily facing issues in getting the available appointment slots. Please try again after some time."
        });
      });
  };
}
