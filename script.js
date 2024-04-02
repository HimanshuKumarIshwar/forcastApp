let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forcast = document.querySelector(".weather_forcast");
let w_icon = document.querySelector(".weather_icon");
let w_temp = document.querySelector(".weather_temperature");
let w_minTemp = document.querySelector(".weather_min");
let w_maxTemp = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidty = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");
let citySearch = document.querySelector(".weather_search")

console.log(w_pressure);
const getCountryName = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000);
  console.log(curDate);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(curDate);
};

let city = "patna";

citySearch.addEventListener("submit", (e)=>{
    e.preventDefault();
    let searchCityName = document.querySelector("#city_name");
     city = searchCityName.value;
     console.log(city);
     getWeatherData();
     searchCityName.value = "";
})


   

const getWeatherData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=d8bb56564af8db29750dac707c8f622f`;
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    console.dir(data);
    const { main, name, weather, wind, sys, dt } = data;
    console.log(getCountryName(sys.country));
    cityName.innerHTML = `${name},${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);
    w_forcast.innerHTML = `${weather[0].main}`
    w_icon.innerHTML = `<img src ='http://openweathermap.org/img/wn/${weather[0].icon}@2x.png'/>`
    w_temp.innerHTML = `${(main.temp-273).toFixed(2)}&#176`;
    w_minTemp.innerHTML = `min: ${main.temp_min.toFixed()-273}&#176`;
    w_maxTemp.innerHTML = `max: ${main.temp_max.toFixed() -273}&#176`;
    w_feelsLike.innerHTML = `${main.feels_like.toFixed()-273}&#176`;
    w_humidty.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerText = `${main.pressure}hpa`;
  } catch (error) {}
};

document.body.addEventListener("load", getWeatherData());
