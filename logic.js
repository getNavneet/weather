//object of weatherapi 
// const weatherApi = {
//     key: 'e6d57368f53cc23a651607920b96b0e9',
//     baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
// }

let search_btn = document.querySelector('.Search-btn')
let input_city = document.querySelector('.inputcity')
let city = input_city.value;
// input_city.addEventListener('keypress',search)
search_btn.addEventListener('click', search)
function search() {

    // console.log("search pressed")
    let weather_body = document.querySelector('.w-report')
    console.log(weather_body)
    weather_body.innerHTML =
        `
    <p>Loading Data please wait ...</p><p>website created by Navneet kumar</p>
    `;
    getWeatherReport(input_city.value) 
}
//get waether report
function getWeatherReport(city) {
    var proxyUrl = 'https://weather.navneet.website/server.php';
    var apiUrl = proxyUrl + '?city=' + encodeURIComponent(city);
    console.log("loading data please wait.....")
    fetch(apiUrl)  // fetch method fetching the data from  base url ...metric is used for unit in celcius......here i am appending the base url to get data by city name .  
        .then(weather => {   //weather is from api
            return weather.json(); // return data from api in JSON
        }).then(showWeaterReport).catch(error => {
            console.error('Error fetching weather:', error);
          });  // calling showweatherreport function 
    //                                                                          
}
function showWeaterReport(weather) {

    // console.log(weather)  // [object object] (reference)
    let city_code = weather.cod;
    if (city_code === '400') {
        swal("Empty Input", "Please enter any city", "error");
        reset();  //input-box reset func
    } else if (city_code === '404') {
        swal("Bad Input", "entered city didn't matched", "warning");
        reset(); //input-box reset func
    }
    else {
        d = new Date();
        htime = d.getHours();
        mtime = d.getMinutes();
        stime = d.getSeconds();
        let weather_body = document.querySelector('.w-report')
        console.log(weather_body)
        weather_body.innerHTML =
            `
    
    <div class="location-details">
    <div class="city"><strong>${weather.name}, ${weather.sys.country}</strong></div>
    <div class="date">${manageDate(d)}</div>
    </div>
    <div class="temp"> <strong>${Math.round(weather.main.temp)} &deg;C </strong>  </div>
    <div class="condition">${weather.weather[0].main}</div>
    
    <div class="updateTime">Updated As of :<strong> ${getTime(d)}</strong></div>
    <hr>
    <div class="day-details">
    <div class="basic">Feels like ${Math.round(weather.main.feels_like)}&deg;C | Humidity ${weather.main.humidity}%  <br> Pressure ${weather.main.pressure} mb | Wind ${weather.wind.speed} KMPH</div>
</div>

    `;

        
    }
    reset();
}
function getTime(todayDate) {
    let hour =addZero(todayDate.getHours());
    let minute =addZero(todayDate.getMinutes());
    return `${hour} : ${minute}`;
}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function manageDate(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];  //dateArg.getMonth()--this method returns (0-11)
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];  //dateArg.getDay()--this method returns (0-6)
    return `${date} ${month} (${day}) , ${year}`
}


function reset() {
    let input = document.querySelector('.inputcity');
    input.value = "";
    // let weather_body = document.querySelector('.w-report')
    // console.log(weather_body)
    // weather_body.innerHTML = ``;
}

