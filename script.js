document.addEventListener('DOMContentLoaded', () => {
    const dateElement = document.getElementById('date');
    const cityInput = document.getElementById('city');
    const searchButton = document.getElementById('search');
    const currentLocationButton = document.getElementById('current-location');
    const temperatureElement = document.getElementById('temperature');
    const climateElement = document.getElementById('climate');
    const animationElement = document.getElementById('animation');

    const updateDate = () => {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString(undefined, options);
    };

    const fetchWeather = async (city) => {
        const apiKey = '5c10850f50663282c835a58dadfc9007';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        return data;
    };

    const fetchWeatherByCoordinates = async (lat, lon) => {
        const apiKey = '5c10850f50663282c835a58dadfc9007';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        return data;
    };

    const displayWeather = (weather) => {
        const temp = weather.main.temp;
        const climate = weather.weather[0].main;
        temperatureElement.textContent = `Temperature: ${temp}°C`;
        climateElement.textContent = `Climate: ${climate}`;
        displayImage(climate);
    };

    const displayImage = (climate) => {
        animationElement.innerHTML = '';
        const image = document.createElement('img');
        image.alt = climate;

        if (climate === 'Clear') {
            image.src = 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png'; // Replace with your sunny image path
        } else if (climate === 'Rain') {
            image.src = 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png'; // Replace with your rainy image path
        } else if (climate === 'Snow') {
            image.src = 'https://static.vecteezy.com/system/resources/previews/011/338/288/original/snowy-cold-weather-day-png.png'; // Replace with your snowy image path
        } else if (climate === 'Clouds') {
            image.src = 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather03-512.png'; // Replace with your cloudy image path
        }else if (climate === 'Mist') {
            image.src = 'https://cdn-icons-png.flaticon.com/512/1850/1850730.png'; // Replace with your cloudy image path
        } else {
            image.src = 'images/default.png'; // Replace with your default image path
        }
        animationElement.appendChild(image);
    };

    searchButton.addEventListener('click', async () => {
        const city = cityInput.value;
        if (city) {
            const weather = await fetchWeather(city);
            displayWeather(weather);
        }
    });

    currentLocationButton.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const weather = await fetchWeatherByCoordinates(lat, lon);
                displayWeather(weather);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });

    updateDate();
});
