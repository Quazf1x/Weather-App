import { setUpPage, togglePageSystem } from "./modules/UI.js";
import { makeApiRequest } from "./modules/API.js";

async function initialLoad() {
  const toggleMetric = document.querySelector('#metric-toggle');
  const data = await makeApiRequest('Omsk');
  setUpPage(data);

  toggleMetric.addEventListener('click', () => {
    if(toggleMetric.checked){
      togglePageSystem(data, true);
    } else {
      togglePageSystem(data, false);
    }
  });

  const searchBtn = document.querySelector('#find-city-button');
  const searchInput = document.querySelector('#find-city-input')

  searchBtn.addEventListener('click', async () => {
    const data = await makeApiRequest(searchInput.value);
    setUpPage(data);
  });
}

initialLoad();


