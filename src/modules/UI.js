import '@fortawesome/fontawesome-free/css/solid.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import { parseISO, format, getDay } from 'date-fns';
import { doc } from 'prettier';

export function setUpPage(data) {
  addEventListeners();
  renderCurrentWeather(data.current);
  renderFutureDay(data.forecast.forecastday[0]);
};

function renderCurrentWeather(currentData) {
  const currentDegreeDisplay = document.querySelector('.current-degree');
  const currentDateDisplay = document.querySelector('.current-date');
  const currentWindDisplay = document.querySelector('.wind-value');
  const currentHumDisplay = document.querySelector('.humidity-value');
  const currentRainDisplay = document.querySelector('.rain-value');

  currentDegreeDisplay.textContent = Math.floor(currentData.temp_c);
  currentDateDisplay.textContent = currentData.last_updated.replace(/-/g, '.').slice(0,-5);
  currentWindDisplay.textContent = `${Math.floor(currentData.wind_kph)} km/h`;
  currentHumDisplay.textContent = `${currentData.humidity} %`;
  currentRainDisplay.textContent = `${currentData.cloud} %`; // ???
}

function renderFutureDay(dataForecast) {
  const weekDayDisplay = document.querySelector('.week-day');
  const weatherIcon = document.querySelector('.weather-icon');
  const weekDay = getDay(parseISO(dataForecast.date));
  switch(weekDay) {
    case 0:
      weekDayDisplay.textContent = 'Sun';
    break;
    case 1:
      weekDayDisplay.textContent = 'Mon';
    break;
    case 2:
      weekDayDisplay.textContent = 'Tue';
    break;
    case 3:
      weekDayDisplay.textContent = 'Wed';
    break;
    case 4:
      weekDayDisplay.textContent = 'Thu';
    break;
    case 5:
      weekDayDisplay.textContent = 'Fri';
    break;
    case 6:
      weekDayDisplay.textContent = 'Sat';
    break;
  }
  const weatherCondition = dataForecast.day.condition.text;
  switch(weatherCondition) {
    case 'Partly cloudy':
      addStyles(weatherIcon, ['fa-solid', 'fa-cloud-sun', 'fa-xl']);
  }

}

function addEventListeners() {
  const searchButton = document.querySelector('#find-city-button');
  const cityInput = document.querySelector('#find-city-input');

  searchButton.addEventListener('click', () => {
    cityInput.focus();
  });
};

function addStyles(element, classesList) {
  classesList.forEach( classElement => {
    element.classList.add(classElement);
  });
}

// function createHTMLElement(type, id, classesList, content) {
//   const element = document.createElement(type);
//     element.setAttribute("id", id);
//     if (classesList != null) {
//       classesList.forEach((elementClass) => {
//         element.classList.add(elementClass);
//       });
//     }
//     element.textContent = content;
//     return element;
// };