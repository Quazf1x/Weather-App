import '@fortawesome/fontawesome-free/css/solid.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import { makeApiRequest } from './API';
import { parseISO, getDay } from 'date-fns';

const toggleMetric = document.querySelector('#metric-toggle');

export function setUpPage(data) {
  const todaysHoursArray = [data.forecast.forecastday[0].hour];
  const displayHours = [
    todaysHoursArray[0][8],
    todaysHoursArray[0][12],
    todaysHoursArray[0][16],
    todaysHoursArray[0][20]
  ];
  clearForecasts();
  renderCurrentWeather(data);
  renderLocation(data.location);
  renderAllFutureDays(data.forecast.forecastday);
  renderTodaysForecast(displayHours);
  renderTimeDetails(todaysHoursArray[0][8]);
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

function renderWeatherIcons(weatherCondition, icon) {
  switch(weatherCondition) {    
    case 'Sunny':
      addStyles(icon, ['fa-sun']);
    break;

    case 'Partly cloudy':
      addStyles(icon, ['fa-cloud-sun']);
    break;

    case 'Mist':
    case 'Cloudy':
      addStyles(icon, ['fa-cloud']);
    break;

    case 'Patchy rain possible':
    case 'Light rain':
    case 'Moderate rain':
      addStyles(icon, ['fa-cloud-rain']);
    break;

    case 'Heavy rain':
    case 'Heavy rain at times':
      addStyles(icon, ['fa-cloud-showers-heavy']);
    break;

    case 'Light snow':
    case 'Moderate snow':
    case 'Heavy snow':
      addStyles(icon, ['fa-snowflake']);
    break;

    default:
      addStyles(icon, ['fa-cloud']);
    break;
  };
}

export function clearForecasts() {
  const weatherForecastDisplay = document.querySelector('#scroll-left-side');
  const weatherTodayDisplay = document.querySelector('#scroll-right-side');
  weatherForecastDisplay.innerHTML = '';
  weatherTodayDisplay.innerHTML = '';
}

function addStyles(element, classesList) {
  classesList.forEach( classElement => {
    element.classList.add(classElement);
  });
}

function renderCurrentWeather(data) {
  const currentDegreeDisplay = document.querySelector('.current-degree');
  const currentDateDisplay = document.querySelector('.current-date');
  const currentMetric = document.querySelector('.current-metric');
  const currentWindDisplay = document.querySelector('.wind-value');
  const currentHumDisplay = document.querySelector('.humidity-value');
  const currentRainDisplay = document.querySelector('.rain-value');

  currentDateDisplay.textContent = data.current.last_updated.replace(/-/g, '.').slice(0,-5);
  currentHumDisplay.textContent = `${data.current.humidity} %`;
  currentRainDisplay.textContent = `${data.forecast.forecastday[0].day.daily_chance_of_rain} %`; // ???
  if(toggleMetric.checked) {
    currentMetric.textContent = 'F';
    currentDegreeDisplay.textContent = Math.floor(data.current.temp_f);
    currentWindDisplay.textContent = `${Math.floor(data.current.wind_mph)} Mph`;
  }
  else {
    currentMetric.textContent = 'C';
    currentDegreeDisplay.textContent = Math.floor(data.current.temp_c);
    currentWindDisplay.textContent = `${Math.floor(data.current.wind_kph)} km/h`;
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
  
  renderWeatherIcons(weatherCondition, weatherIcon);
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

function renderAllFutureDays(forecastArray) {
  forecastArray.forEach(forecast => {
    renderFutureDay(forecast);
  })
};

function renderTodayCard(hourData, index) {
  const weatherDisplay = document.querySelector('#scroll-right-side');
  const weatherDiv = createHTMLElement('div', null, ['weather-day-div'], null);
  const weatherNumber = createHTMLElement('p', null, null, null);
  const weatherMetric = createHTMLElement('span', null, ['current-metric']);
  const weatherIcon = createHTMLElement('i', null, ['fa-solid', 'fa-xl'], null);
  const dayTimeDisplay = createHTMLElement('p', null, ['week-day'], hourData.time.slice(-5));

  const weatherCondition = hourData.condition.text;
  renderWeatherIcons(weatherCondition, weatherIcon);
  weatherIcon.style.color = 'white';

  if(toggleMetric.checked) {
    weatherNumber.textContent = Math.floor(hourData.temp_f);
    weatherMetric.textContent = ' F';
  }
  else {
    weatherNumber.textContent = Math.floor(hourData.temp_c);
    weatherMetric.textContent = ' C';
  };

  weatherDiv.addEventListener('click', () => {
    setActiveTimeTab(weatherDiv, true);
    renderTimeDetails(hourData);
  });

  weatherNumber.appendChild(weatherMetric);
  weatherDiv.append(dayTimeDisplay, weatherIcon, weatherNumber);
  weatherDisplay.appendChild(weatherDiv);
}

function renderTodaysForecast(timeArray) {
  timeArray.forEach((time,index) => {
    renderTodayCard(time, index);
  })
}

function renderLocation(locationData) {
  const cityDisplay = document.querySelector('.current-city');
  const countryDisplay = document.querySelector('.current-country');

  cityDisplay.textContent = locationData.name;
  countryDisplay.textContent = locationData.country;
}

function setActiveTimeTab(neededTab, isToday) {
  let tabsArray;
  if(isToday) 
    tabsArray = document.querySelectorAll('#scroll-right-side .weather-day-div');
  else 
    tabsArray = document.querySelectorAll('#scroll-left-side .weather-day-div');

    tabsArray.forEach(tab => {
      if(tab !== neededTab) {
        tab.classList.remove('chosen-div');
      } 
      else tab.classList.add('chosen-div');
    })
  
}

function renderTimeDetails(hourData) {
  const humidityDisplay = document.querySelector('.set-time-humidity');
  const rainChanceDisplay = document.querySelector('.set-time-rain');
  const windSpeedDisplay = document.querySelector('.set-time-wind');
  const windDirDisplay = document.querySelector('.set-wind-dir');

  rainChanceDisplay.textContent = `${hourData.chance_of_rain} %`
  humidityDisplay.textContent = `${hourData.humidity} %`;
  windDirDisplay.textContent = hourData.wind_dir;

  if(toggleMetric.checked) {
    windSpeedDisplay.textContent = `${hourData.wind_mph} mph`;
  }
  else {
    windSpeedDisplay.textContent = `${hourData.wind_kph} km/h`
  }
}