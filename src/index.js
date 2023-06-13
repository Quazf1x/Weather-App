import { setUpPage, togglePageSystem } from "./modules/UI.js";
import { makeApiRequest } from "./modules/API.js";
import Swal from 'sweetalert2';

async function initialLoad() {
  const data = await makeApiRequest("Los-Angeles");
  setUpPage(data);

  const toggleMetric = document.querySelector("#metric-toggle");

  toggleMetric.addEventListener("click", () => {
    if (toggleMetric.checked) {
      togglePageSystem(data, true);
    } else {
      togglePageSystem(data, false);
    }
  });

  const searchBtn = document.querySelector("#find-city-button");
  const searchInput = document.querySelector("#find-city-input");

  searchBtn.addEventListener("click", async () => {
    if(searchInput.value === '') {
      Swal.fire({
        title: 'Error!',
        text: 'You must type the location\'s name.',
        icon: 'error',
        confirmButtonText: 'Understood'
      })
    } else { 
    const data = await makeApiRequest(searchInput.value);
    setUpPage(data);
  }
  });
}

initialLoad();
