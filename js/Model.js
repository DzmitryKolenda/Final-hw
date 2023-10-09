class Model {

  constructor (citiesRecentPlace = [], controller) {
    this.citiesRecentPlace = citiesRecentPlace;
  }

  addCityRecentPlace(city) {
    let cityId = (this.citiesRecentPlace.find(elem => elem.id === city.id) && true) || false;

    let lastCityId = null;
    
    if (!cityId) {
      if (this.citiesRecentPlace.length === 5) {
        lastCityId = this.citiesRecentPlace[4].id;
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
