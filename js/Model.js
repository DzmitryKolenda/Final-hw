class Model {

  constructor (citiesRecentPlace = [], citiesForm = []) {
    this.citiesRecentPlace = citiesRecentPlace;
    this.citiesForm = citiesForm;
  }

  addCityForm(citiesWeather) {
    this.citiesForm.push(citiesWeather);
    
    return citiesWeather;
  }

  addCityRecentPlace(city) {
    let cityId = (this.citiesRecentPlace.find(elem => elem.id === city.id) && true) || false;

    let lastCityId = null;
    
    if (!cityId) {
      if (this.citiesRecentPlace.length === 10) {
        lastCityId = this.citiesRecentPlace[9].id;
      }

      this.citiesRecentPlace = [city, ...this.citiesRecentPlace];

      return {city, lastCityId};

    } else {
      
      return {city: null, lastCityId};
    }
  }

  deleteCityItemRecentPlace(id) {
    this.citiesRecentPlace = this.citiesRecentPlace.filter(city => city.id !== id);

    return id;
  }

}
