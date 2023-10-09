const apiKey = '3e731d48020ea04c53258beb7a3e4280';

const getCitiesWeather = async (city) => {
    return await apiRequest(`/geo/1.0/direct?q=${city}&limit=5&lang=ru&units=metric&appid=${apiKey}`, 'GET')
}

const getСityWeather = async (coordinates) => {
    const lat = coordinates[0];
    const lon = coordinates[1];

    return await apiRequest(`/data/2.5/weather?lat=${lat}&lon=${lon}&limit=5&units=metric&appid=${apiKey}`, 'GET')
}

const getFiveDayСityWeather = async (coordinates) => {
    const lat = coordinates[0];
    const lon = coordinates[1];
    
    return await apiRequest(`/data/2.5/forecast?lat=${lat}&lon=${lon}&limit=5&lang=ru&units=metric&appid=${apiKey}`, 'GET')
}

