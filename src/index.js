import { setUpPage, clearForecasts } from "./modules/UI.js";
import { makeApiRequest } from "./modules/API.js";

const toggleMetric = document.querySelector('#metric-toggle');

async function initialLoad() {
  const data = await makeApiRequest('Omsk');
  setUpPage(data);

  toggleMetric.addEventListener('click', () => {
    clearForecasts();
    setUpPage(data);
  });
}

initialLoad();


