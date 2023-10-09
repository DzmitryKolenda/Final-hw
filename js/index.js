const model = new Model();
const view = new View(new DomHelper());
const controller = new Controller(model, view);

controller.init();


/* const apiKey = '3e731d48020ea04c53258beb7a3e4280';
const cityName = 'Minsk';

formInput = document.getElementById('form-input');
console.log('Value', formInput.value)

function getCityWeather(cityName) {
   return fetch(`http://api.openweathermap.org/data/2.5/weather?q=Minsk&limit=5&lang=ru&units=metric&appid=${apiKey}`);
};

function getCityWeatherFiveDay(cityName) {
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Minsk&limit=5&lang=ru&units=metric&appid=${apiKey}`);
};


getCityWeather()
    .then(res => res.json())
    .then(data => {
        console.log('CITY WEATHER', data)
    })

getCityWeatherFiveDay()
    .then(res => res.json())
    .then(data => {
        console.log('CITY WEATHER 5 DAY', data)
    }) */