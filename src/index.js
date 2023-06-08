import { setUpPage, clearForecasts } from "./modules/UI.js";
import { makeApiRequest } from "./modules/API.js";

const toggleMetric = document.querySelector('#metric-toggle');

const data = await makeApiRequest();
setUpPage(data);
toggleMetric.addEventListener('click', () => {
  clearForecasts();
  setUpPage(data)
});