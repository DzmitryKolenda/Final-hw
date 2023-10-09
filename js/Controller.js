class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.on('search', this.searchCity.bind(this));
    this.view.on('searchCity', this.searchСoordinates.bind(this));
    this.view.on('delete', this.deleteCityItemRecentPlace.bind(this));
  }

  init() {
    this.view.show(this.model.citiesRecentPlace);
  }

  async searchCity(city) {
    const citiesWeather = await getCitiesWeather(city);

    if (citiesWeather.length === 0) {
      alert("Not found. To make search more precise put the city's name.")
    } else {
      this.view.show(citiesWeather);
    }
  }

  async searchСoordinates(coordinates) {
    const nowCityWeather = await getСityWeather(coordinates);

    const fiveDayCityWeather = await getFiveDayСityWeather(coordinates);

    this.view.showWeather(nowCityWeather);

    this.view.showFiveDayWeather(fiveDayCityWeather);

    this.addCityRecentPlace(nowCityWeather);
  }

  addCityRecentPlace(nowCityWeather) {
    const data = this.model.addCityRecentPlace(nowCityWeather);

    const lastCityId = data.lastCityId;
    const city = data.city;

    if (city !== null) {
      this.view.addCityRecentPlace(city);
    }

    if (lastCityId !== null) {
      this.deleteCityItemRecentPlace(lastCityId);
    }
  }

  deleteCityItemRecentPlace(id) {
    const deleteCityItemRecentPlaceId = this.model.deleteCityItemRecentPlace(id);

    this.view.deleteCityItemRecentPlace(deleteCityItemRecentPlaceId);
  }
}
