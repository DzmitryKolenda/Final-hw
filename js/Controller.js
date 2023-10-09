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

    console.log('citiesWeather', citiesWeather);

    if (citiesWeather.length === 0) {
      alert("Not found. To make search more precise put the city's name.")
    } else {
      this.view.show(citiesWeather);
    }
  }

  async searchСoordinates(coordinates) {
    const nowCityWeather = await getСityWeather(coordinates);

    const fiveDayCityWeather = await getFiveDayСityWeather(coordinates);

    console.log('СoordinatesCity', coordinates);

    console.log('nowCityWeather', nowCityWeather);

    console.log('fiveDayCityWeather', fiveDayCityWeather);

    this.view.showWeather(nowCityWeather);

    this.view.showFiveDayWeather(fiveDayCityWeather);

    this.addCityRecentPlace(nowCityWeather);
  }

  addCityRecentPlace(nowCityWeather) {
    const data = this.model.addCityRecentPlace(nowCityWeather);

    const lastCityId = data.lastCityId;
    const city = data.city;

    console.log('lastCityId', lastCityId);

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
  


  /* constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('add', this.addTodo.bind(this));
    view.on('toggle', this.toggleTodo.bind(this));
    view.on('edit', this.updateTodo.bind(this));
    view.on('delete', this.deleteTodo.bind(this));
  }

  init() {
    this.view.show(this.model.todos);
  }

  addTodo(title) {
    const todo = this.model.addTodo({
      id: Date.now(),
      title,
      completed: false,
    });

    this.view.addTodo(todo);
  }

  toggleTodo({ id, completed }) {
    const updatedTodo = this.model.updateItem(id, { completed });

    this.view.toggleTodo(updatedTodo);
  }

  updateTodo({ id, title }) {
    const updatedTodo = this.model.updateItem(id, { title });

    this.view.updateTodo(updatedTodo);
  }

  deleteTodo({ id }) {
    this.model.deleteTodo(id);

    this.view.deleteTodo(id);
  } */
}
