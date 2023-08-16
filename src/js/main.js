let weatherCardLocation = document.getElementById("weatherDataCard");
let date = new Date().toLocaleDateString("sr-RS");
let cardData = '';

function getWeatherData() {
    let cityID = '792078';
    let key = '2ab7b8a3272e56fc2d5f8ce37a1325fa';

    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key + '&units=metric')  
    .then(Response => Response.json())
    .then(function(weatherData) {
        console.log(weatherData);
        addWeatherCard(weatherData);
    });
}

function addWeatherCard(weatherData) {
    cardData = `
    <div class="card cardHover ms-auto me-auto" style="max-width: 540px;">
        <div class="card-header">
            <h5 class="card-title text-center mt-2"><b>Weather in ${weatherData.name}</b></h5>
            </div>
            <div class="row g-0">
            <div class="col-md-4">
                <img src="${getWeatherIcon(weatherData.cod)}" class="img-fluid rounded-start ps-5 pt-4" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <p class="card-text">Temperature: <b>${weatherData.main.temp}</b> °C</p>
                <p class="card-text">Humidity: <b>${weatherData.main.humidity}</b>%</p>
                <p class="card-text">Air Pressure: <b>${weatherData.main.pressure}</b> hPa</p>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <p class="card-text text-center"><small class="text-muted">${date}</small></p>
        </div>
    </div>
    `;
    weatherCardLocation.innerHTML = cardData;
}

function getWeatherIcon(code) {

    if(code >= 200 && code <= 232)
        return './img/weather-icons/11d@2x.png';
    else if((code >= 300 && code <= 321) || (code >= 520 && code <= 531))
        return './img/weather-icons/09d@2x.png';
    else if(code >= 500 && code <= 504)
        return './img/weather-icons/10d@2x.png';
    else if((code >= 600 && code <= 622) || code == 511)
        return './img/weather-icons/13d@2x.png';
    else if(code >= 701 && code <= 781)
        return './img/weather-icons/50d@2x.png';
    else if(code == 800)
        return './img/weather-icons/01d@2x.png';
    else
        return './img/weather-icons/02d@2x.png';
} 

