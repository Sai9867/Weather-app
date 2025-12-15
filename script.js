const cityInput = document.querySelector(".city-input") 
const searchBtn = document.querySelector('.search-btn')
const notfoundsection = document.querySelector('.not-found')
const weatherinfosection = document.querySelector('.weather-info')
const searchcitysection = document.querySelector('.search-city')

const countrytxt = document.querySelector(".country_txt")
const temptxt = document.querySelector('.temp-txt')
const coditiontxt = document.querySelector('.condition-txt')

const humiditytxt = document.querySelector('.humdity-txt')
const windtxt = document.querySelector('.wind-txt')

const weathersummaryimg = document.querySelector(".weather-summary-img")
const Currentdatetxt = document.querySelector('.current-date-txt')


const apikey = '6090188197d9a8ba6177f98fd6cfdb06'

searchBtn.addEventListener('click',function(){
  if       (cityInput.value.trim() !=""){
    updateWeatherInfo(cityInput.value)
    cityInput.value = ""
    cityInput.blur()
  }
  
})

cityInput.addEventListener('keydown',(event) =>{
  if(event.key == "Enter" && cityInput.value.trim() !="" ){
    updateWeatherInfo(cityInput.value)
    cityInput.value = ""
    cityInput.blur()

  }
})
async function getFectData(endPoint,city){
  const apiurl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apikey}&units=metric `

  const response = await fetch(apiurl)
  return response.json()

}
function getweathericon(id){
  if (id >= 200 && id < 300) return "thunderstorm.svg";
  if (id >= 300 && id < 400) return "drizzle.svg";
  if (id >= 500 && id < 600) return "rain.svg";
  if (id >= 600 && id < 700) return "snow.svg";
  if (id >= 700 && id < 800) return "atmosphere.svg";
  if (id == 800) return "clear.svg";
  if (id > 800) return "clouds.svg";
}

function getCurrentdate(){
  const currentdate = new Date()
  const options = {
    weekday:'short',
    day:'2-digit',
    month:'short'


  }
  return currentdate.toLocaleDateString('en-GB',options).replace(",", "")
}
  

async function updateWeatherInfo(city){
  const weatherData = await getFectData('weather',city)
  if(Number(weatherData.cod)!== 200){
    document.body.style.background = "linear-gradient(135deg, #ff5f6d, #ffc371)";
    showDisplaySection(notfoundsection)
    return
  }
  const{
    name: Country,
    main: {temp,humidity},
    weather: [{id,main}],
    wind:{speed}
  } = weatherData

  document.body.style.background = getBackgroundById(id);
  document.body.style.backgroundSize = "cover";
  document.body.style.transition = "0.6s ease"; 
  countrytxt.textContent = Country
  temptxt.textContent = Math.round(temp) + '°C';
  humiditytxt.textContent = humidity +"%"
  windtxt.textContent = speed+ "M/s"
  coditiontxt.textContent = main

  const iconFile = getweathericon(id);
  Currentdatetxt.textContent = getCurrentdate()
  weathersummaryimg.src = `assets/weather/${iconFile}`;

  

  showDisplaySection(weatherinfosection)

}
function showDisplaySection(section){
  [weatherinfosection, searchcitysection, notfoundsection]
    .forEach(sec => sec.style.display = "none");

  section.style.display = "flex"
}

// color change
function getBackgroundById(id) {
  if (id === 800) {
    return "linear-gradient(135deg, #4facfe, #00f2fe)"; // Clear sky
  } else if (id >= 801 && id <= 803) {
    return "linear-gradient(135deg, #90a4ae, #cfd8dc)"; // Few clouds
  } else if (id === 804) {
    return "linear-gradient(135deg, #616161, #9e9e9e)"; // Overcast
  } else if (id >= 500 && id <= 501) {
    return "linear-gradient(135deg, #4e54c8, #8f94fb)"; // Light rain
  } else if (id >= 200 && id <= 232) {
    return "linear-gradient(135deg, #232526, #414345)"; // Thunderstorm
  } else if (id >= 300 && id <= 321) {
    return "linear-gradient(135deg, #74ebd5, #acb6e5)"; // Drizzle
  } else if (id >= 600 && id <= 622) {
    return "linear-gradient(135deg, #e0eafc, #cfdef3)"; // Snow
  } else if (id >= 701 && id <= 781) {
    return "linear-gradient(135deg, #bdc3c7, #2c3e50)"; // Mist / Fog
  }

  return "linear-gradient(135deg, #3a3a3a, #000000)"; // Fallback
}
