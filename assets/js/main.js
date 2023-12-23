const container = document.querySelector('.container')
const search_btn = document.querySelector(".weather-search-btn");
const not_found = document.querySelector('.not-found');
const input = document.querySelector('.weather-location-input');
const weather_details = document.querySelector('.weather-details');

const weather_img = document.querySelector('.weather-img');
const weather_temparature = document.querySelector('.weather-temparature');
const weather_type = document.querySelector('.weather-type');
const weather_info = document.querySelector('.weather-info');

const city_name = document.querySelector('.name');

const my_api_keys = '1b8d7bdc1f47771d5acd90e65786747d';

const weather_conditions = ['Clouds', 'Clear', 'Rain', 'Snow', 'Thunderstorm', 'Drizzle', 'Mist', 'Haze', 'Fog', 'Smoke', 'Dust', 'Sand', 'Ash', 'Squall', 'Tornado'];

search_btn.addEventListener('click', (e) => {
    // refresh animation
    not_found.classList.remove('fade-in');
    weather_info.classList.remove('fade-in');
    weather_details.classList.remove('fade-in');
    city_name.classList.remove('fade-in');
    const city = input.value;
    input.value = '';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${my_api_keys}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            if(data.cod === '404') {
                not_found.style.display = 'block';
                not_found.classList.add('fade-in');
                container.style.height = '355px'
                weather_details.style.display = 'none';
                return;
            }

            not_found.style.display = 'none';
            not_found.classList.remove('fade-in');

            weather_img.src = '';
            const current_weather = data.weather[0].main;
            for(let i = 0; i < weather_conditions.length; i++) {
                if(current_weather === weather_conditions[i]) {
                    weather_img.src = `assets/img/${weather_conditions[i]}.png`;
                    break;
                }
            }
            weather_temparature.textContent = `${parseInt(data.main.temp)}°C`;
            weather_type.textContent = `${data.weather[0].description}`;

            const current_city = data.name;
            city_name.textContent = current_city;
            city_name.classList.add('fade-in');
            city_name.style.display = 'block';

            const weather_humidity = document.querySelector('.humidity');   
            const weather_wind = document.querySelector('.wind');
            console.log(weather_humidity, weather_wind);
            weather_humidity.textContent = `${data.main.humidity}%`;
            weather_wind.textContent = `${data.wind.speed} Km/h`;

            // dislay 
            container.style.height = '700px'
            weather_info.style.display = 'block';
            weather_info.classList.add('fade-in');
            weather_details.style.display = 'flex'; 
            weather_details.classList.add('fade-in');

        })
});
