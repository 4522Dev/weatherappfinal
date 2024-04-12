const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = locationInput.value.trim();
    if (location) {
        getWeather(location);
    } else {
        weatherInfo.innerHTML = '<p>Please enter a location.</p>';
    }
});

function getWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48b1d01310bf10ff473e427e4d511fa8&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not available.');
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const weatherDescription = data.weather[0].description;
            const weatherOutput = `
                <h2>Weather in ${location}</h2>
                <p><strong>Temperature:</strong> ${temperature}°C</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Weather:</strong> ${weatherDescription}</p>
            `;
            weatherInfo.innerHTML = weatherOutput;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = '<p>Weather data not available. Please try again later.</p>';
        });
}
