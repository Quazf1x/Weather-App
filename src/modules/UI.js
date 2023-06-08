import '@fortawesome/fontawesome-free/css/solid.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import { parseISO, format, getDay } from 'date-fns';
import { doc } from 'prettier';

const toggleMetric = document.querySelector('#metric-toggle');

export function setUpPage(data) {
  addEventListeners();
  renderCurrentWeather(data.current);
  renderAllFutureDays(data.forecast.forecastday);
};

function createHTMLElement(type, id, classesList, content) {
  const element = document.createElement(type);
    element.setAttribute("id", id);
    if (classesList != null) {
      classesList.forEach((elementClass) => {
        element.classList.add(elementClass);
      });
    }
    element.textContent = content;
    return element;
};

function addStyles(element, classesList) {
  classesList.forEach( classElement => {
    element.classList.add(classElement);
  });
}

function renderCurrentWeather(currentData) {
  const currentDegreeDisplay = document.querySelector('.current-degree');
  const currentDateDisplay = document.querySelector('.current-date');
  const currentMetric = document.querySelector('.current-metric');
  const currentWindDisplay = document.querySelector('.wind-value');
  const currentHumDisplay = document.querySelector('.humidity-value');
  const currentRainDisplay = document.querySelector('.rain-value');

  currentDateDisplay.textContent = currentData.last_updated.replace(/-/g, '.').slice(0,-5);
  currentHumDisplay.textContent = `${currentData.humidity} %`;
  currentRainDisplay.textContent = `${currentData.cloud} %`; // ???
  if(toggleMetric.checked) {
    currentMetric.textContent = 'F';
    currentDegreeDisplay.textContent = Math.floor(currentData.temp_f);
    currentWindDisplay.textContent = `${Math.floor(currentData.wind_mph)} Mph`;
  }
  else {
    currentMetric.textContent = 'C';
    currentDegreeDisplay.textContent = Math.floor(currentData.temp_c);
    currentWindDisplay.textContent = `${Math.floor(currentData.wind_kph)} km/h`;
  }
}

function renderFutureDay(dataForecast) {
  const weatherDisplay = document.querySelector('#scroll-left-side');
  const weatherDiv = createHTMLElement('div', null, ['weather-day-div'], null);
  const weatherNumber = createHTMLElement('p', null, null, null);
  const weatherMetric = createHTMLElement('span', null, ['current-metric']);
  const weatherIcon = createHTMLElement('i', null, ['fa-solid', 'fa-xl'], null);
  const weekDayDisplay = createHTMLElement('p', null, ['week-day'], null);

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
  };

  const weatherCondition = dataForecast.day.condition.text;
  switch(weatherCondition) {    
    case 'Sunny':
      addStyles(weatherIcon, ['fa-sun']);
    break;

    case 'Partly cloudy':
      addStyles(weatherIcon, ['fa-cloud-sun']);
    break;

    case 'Mist':
    case 'Cloudy':
      addStyles(weatherIcon, ['fa-cloud']);
    break;

    case 'Patchy rain possible':
    case 'Light rain':
    case 'Moderate rain':
      addStyles(weatherIcon, ['fa-cloud-rain']);
    break;

    case 'Heavy rain':
    case 'Heavy rain at times':
      addStyles(weatherIcon, ['fa-cloud-showers-heavy']);
    break;

    case 'Light snow':
    case 'Moderate snow':
    case 'Heavy snow':
      addStyles(weatherIcon, ['fa-snowflake']);
    break;

    default:
      addStyles(weatherIcon, ['fa-cloud']);
    break;
  };

  weatherIcon.style.color = 'white';

  if(toggleMetric.checked) {
    weatherNumber.textContent = Math.floor(dataForecast.day.avgtemp_f);
    weatherMetric.textContent = ' F';
  }
  else {
    weatherNumber.textContent = Math.floor(dataForecast.day.avgtemp_c);
    weatherMetric.textContent = ' C';
  };

  weatherNumber.appendChild(weatherMetric);
  weatherDiv.append(weatherNumber, weatherIcon, weekDayDisplay);
  weatherDisplay.appendChild(weatherDiv);
}

export function clearForecasts() {
  const weatherDisplay = document.querySelector('#scroll-left-side');
  weatherDisplay.innerHTML = '';
}

function renderAllFutureDays(forecastArray) {
  forecastArray.forEach(forecast => {
    console.log(forecast);
    renderFutureDay(forecast);
  })
}

function addEventListeners() {
  const searchButton = document.querySelector('#find-city-button');
  const cityInput = document.querySelector('#find-city-input');

  searchButton.addEventListener('click', () => {
    cityInput.focus();
  });
};
