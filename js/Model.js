class Model {

  constructor (citiesRecentPlace = [], controller) {
    this.citiesRecentPlace = citiesRecentPlace;
  }

  addCityRecentPlace(city) {
    let cityId = (this.citiesRecentPlace.find(elem => elem.id === city.id) && true) || false;
    console.log(cityId);

    let lastCityId = null;
    
    if (!cityId) {
      if (this.citiesRecentPlace.length === 5) {
        lastCityId = this.citiesRecentPlace[4].id;
      }

      this.citiesRecentPlace = [city, ...this.citiesRecentPlace];

      console.log(this.citiesRecentPlace);

      console.log(this.citiesRecentPlace.length);

      console.log(lastCityId);

      return {city, lastCityId};

    } else {
      
      return {city: null, lastCityId};
    }
  }

  deleteCityItemRecentPlace(id) {
    this.citiesRecentPlace = this.citiesRecentPlace.filter(city => city.id !== id);

    return id;
  }


  
  /* constructor(todos = []) {
    this.todos = todos;
  }

  addTodo(todo) {
    this.todos.push(todo);

    return todo;
  }

  updateItem(id, dataToUpdate) {
    let updatedTodo;

    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        updatedTodo = {
          ...todo,
          ...dataToUpdate,
        };

        return updatedTodo;
      }

      return todo;
    });

    return updatedTodo;
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);

    return id;
  } */
}
