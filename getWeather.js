
export function getWeatherWindow(event, city, currentWeather, currentPlace) {
    if (!document.querySelector('.weather_window')) {
      const weatherWindow = document.createElement('div');
            weatherWindow.setAttribute('class', 'weather_window');
      city.appendChild(weatherWindow);
      const degreesCelsius = document.createElement('div');
            degreesCelsius.setAttribute('class', 'degrees-celsius');
            degreesCelsius.innerText = `${currentWeather.temp_c} °C`;
      const location = document.createElement('div');
            location.setAttribute('class', 'location');
            location.innerText = `${event.target.innerText}`;
      const localTime = document.createElement('div');
            localTime.setAttribute('class', 'local-time');
      localTime.innerText = `Last measure: <br> ${currentPlace.localtime}`;
      weatherWindow.appendChild(degreesCelsius);
      weatherWindow.appendChild(location);
      weatherWindow.appendChild(localTime);
    } else {
      const removeWeatherWindow = document.querySelector('.weather_window')
      removeWeatherWindow.parentElement.removeChild(removeWeatherWindow);
    }
}
export function unableToGetWeather(event, city) {

    const weatherWindow = document.createElement('div');
        weatherWindow.setAttribute('class', 'weather_window');
    city.appendChild(weatherWindow);
    const location = document.createElement('div');
        location.setAttribute('class', 'invalid-location');
        location.innerText = `There is no available weather data for ${event.target.innerText}, please edit to nearby location in english words!`;
    weatherWindow.appendChild(location)

}

export function getCityForWeather() {
    const studentCityMain = [...document.querySelectorAll(".studentCity")];
    studentCityMain.forEach((city) => {
    city.addEventListener("mouseover", async (event) => {
    try {
        const weather1 = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=039d505d574143e89f6215143221105&q=${event.target.innerText}&aqi=no`
        );
        const data = await weather1.json();
        const currentWeather = data.current;
        const currentPlace = data.location;
        getWeatherWindow(event, city, currentWeather, currentPlace)
    } catch (e) {
        unableToGetWeather(event, city);
        // alert(
        //   "city is not supported, please write nearby city name in english to get the weather"
        // );
    } finally {
        city.addEventListener('mouseleave', () => {
        if (document.querySelector('.weather_window')) {
            const removeWeatherWindow = document.querySelector('.weather_window')
            removeWeatherWindow.parentElement.removeChild(removeWeatherWindow);
        }
        })

    }
    });
});
}