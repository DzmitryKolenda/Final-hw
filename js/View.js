class View extends EventEmitter {
  constructor(domElementBuilder) {
    super();

    this.domElementBuilder = domElementBuilder;

    this.form = document.getElementById('form');
    this.formInput = document.getElementById('form-input');
    this.cityList = document.getElementById('city-list');
    this.wrapper = document.querySelector('.wrapper');

    this.wrapperRecentPlace = document.querySelector('.wrapper-2');
    this.cityListRecentPlace = document.getElementById('city-list-recent-place');

    this.containerText = document.querySelector('.container-text');
    this.weatherContainer = document.querySelector('.weather-container');
    this.city = document.querySelector('.city');
    this.time = document.querySelector('.time');
    this.iconImg = document.querySelector('.icon-img');
    this.temp = document.querySelector('.temp');
    this.pattern = document.querySelector('.pattern');
    this.humidity = document.querySelector('.humidity');

    this.dayCartDayWeekThree = document.querySelector('.three .day-week');
    this.dayCartDayWeekFour = document.querySelector('.four .day-week');
    this.dayCartDayWeekFive = document.querySelector('.five .day-week');

    this.dayCartIconOne = document.querySelector('.one .day-cart-icon');
    this.dayCartIconTwo = document.querySelector('.two .day-cart-icon');
    this.dayCartIconThree = document.querySelector('.three .day-cart-icon');
    this.dayCartIconFour = document.querySelector('.four .day-cart-icon');
    this.dayCartIconFive = document.querySelector('.five .day-cart-icon');

    this.dayTempOne = document.querySelector('.one .day-temp');
    this.nightTempOne = document.querySelector('.one .night-temp');
    this.dayTempTwo = document.querySelector('.two .day-temp');
    this.nightTempTwo = document.querySelector('.two .night-temp');
    this.dayTempThree = document.querySelector('.three .day-temp');
    this.nightTempThree = document.querySelector('.three .night-temp');
    this.dayTempFour = document.querySelector('.four .day-temp');
    this.nightTempFour = document.querySelector('.four .night-temp');
    this.dayTempFive = document.querySelector('.five .day-temp');
    this.nightTempFive = document.querySelector('.five .night-temp');

    this.realFeelOne = document.querySelector('.one .real-feel-temp')
    this.realFeelTwo = document.querySelector('.two .real-feel-temp')
    this.realFeelThree = document.querySelector('.three .real-feel-temp')
    this.realFeelFour = document.querySelector('.four .real-feel-temp')
    this.realFeelFive = document.querySelector('.five .real-feel-temp')

    this.handleSearch = this.handleSearch.bind(this); 
    this.handleCitySearch = this.handleCitySearch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);  

    this.form.addEventListener('submit', this.handleSearch.bind(this));
  }

  show(citiesWeather) {
    this.deleteCityItem();

    citiesWeather.forEach(city => {
      this.addCity(city);
    });
  }

  addCity(city) {
    const cityItem = this.createCityItem(city);

    this.addCityItemToList(cityItem);
  }

  createCityItem(city) {
    const cityButton = this.domElementBuilder.createCityButton([{ prop: 'type', value: 'button'}], [{event: 'click', handler: this.handleCitySearch}], city);

    return this.domElementBuilder.createListItem([cityButton]);
  }

  addCityItemToList (cityItem) {
    this.cityList.append(cityItem);
  }

  deleteCityItem() {
    const cityItems = document.querySelectorAll('.city-item');
    const arrayCityItems = [...cityItems];
    
    if (arrayCityItems.length !== 0) {
      this.cityList.innerHTML = '';
    }
  }

  handleSearch (event) {
    event.preventDefault();

    const city = this.formInput.value;

    if (city.trim() === '') {
      return;
    }

    this.emit('search', city);

    this.wrapper.classList.add('displayOn');
  }

  handleCitySearch(event) {
    const textContent = event.target.textContent;
    const lat = textContent.slice(textContent.indexOf('(') + 1, textContent.lastIndexOf(','));
    const lon = textContent.slice(textContent.lastIndexOf(',') + 2, textContent.lastIndexOf(')'));
    const coordinates = [lat, lon];

    this.emit('searchCity', coordinates);

    this.wrapper.classList.remove('displayOn');

    this.formInput.value = '';

    this.cityList.innerHTML = '';
  }

  showWeather(nowCityWeather) {
    this.containerText.classList.add('displayOf');    

    this.weatherContainer.classList.add('displayOn');

    this.wrapperRecentPlace.classList.add('displayOn');

    this.city.textContent = nowCityWeather.name;

    const date = new Date(Date.now());

    let hours = date.getHours();

    if (hours < 9) {
      hours = '0' + String(hours);
    }

    let minutes = date.getMinutes();

    if (minutes < 9) {
      minutes = '0' + String(minutes);
    }
    
    this.time.textContent = hours + ':' + minutes;

    this.iconImg.setAttribute('src', `./image/icon/${nowCityWeather.weather[0].icon}.png`);

    this.temp.textContent = `${Math.round(nowCityWeather.main.temp)}°C`;

    this.pattern.textContent =  nowCityWeather.weather[0].description;

    this.humidity.textContent = `${nowCityWeather.main.humidity}%`;
  }

  showFiveDayWeather(fiveDayCityWeather) {
    const nowDate = new Date(fiveDayCityWeather.list[0].dt_txt);

    const weatherOne = this.filterDate(fiveDayCityWeather, 0);

    const weatherTwo = this.filterDate(fiveDayCityWeather, 1);

    const weatherThree = this.filterDate(fiveDayCityWeather, 2);

    const weatherFour = this.filterDate(fiveDayCityWeather, 3);

    const weatherFive = this.filterDate(fiveDayCityWeather, 4);

    const dayOfWeek = this.findDayOfWeek(nowDate);

    const dayThree = new Date(nowDate.setDate(nowDate.getDate() + 2));
    const dayOfWeekThree = this.findDayOfWeek(dayThree);

    const dayFour = new Date(nowDate.setDate(nowDate.getDate() + 1));
    const dayOfWeekFour = this.findDayOfWeek(dayFour);

    const dayFive = new Date(nowDate.setDate(nowDate.getDate() + 1));
    const dayOfWeekFive = this.findDayOfWeek(dayFive);

    this.dayCartDayWeekThree.textContent = dayOfWeekThree;
    this.dayCartDayWeekFour.textContent = dayOfWeekFour;
    this.dayCartDayWeekFive.textContent = dayOfWeekFive;

    this.dayCartIconOne.setAttribute('src', `./image/icon/${fiveDayCityWeather.list[0].weather[0].icon}.png`);

    const iconTwo = this.addIcon(weatherTwo);
    this.dayCartIconTwo.setAttribute('src', `./image/icon/${iconTwo}.png`);

    const iconThree = this.addIcon(weatherThree);
    this.dayCartIconThree.setAttribute('src', `./image/icon/${iconThree}.png`);

    const iconFour = this.addIcon(weatherFour);
    this.dayCartIconFour.setAttribute('src', `./image/icon/${iconFour}.png`);

    const iconFive = this.addIcon(weatherFive);
    this.dayCartIconFive.setAttribute('src', `./image/icon/${iconFive}.png`);

    this.dayTempOne.textContent = `${Math.round(weatherOne[0].main.temp)}°C`;

    this.dayTempTwo.textContent = `${Math.round(((weatherTwo[3].main.temp 
      + weatherTwo[4].main.temp + weatherTwo[5].main.temp 
      + weatherTwo[6].main.temp) / 4))}°C`;
    this.nightTempTwo.textContent = `${Math.round(((weatherTwo[0].main.temp 
      + weatherTwo[1].main.temp + weatherTwo[2].main.temp 
      + weatherTwo[7].main.temp) / 4))}°C`;

    this.dayTempThree.textContent = `${Math.round(((weatherThree[3].main.temp 
      + weatherThree[4].main.temp + weatherThree[5].main.temp 
      + weatherThree[6].main.temp) / 4))}°C`;
    this.nightTempThree.textContent = `${Math.round(((weatherThree[0].main.temp 
      + weatherThree[1].main.temp + weatherThree[2].main.temp 
      + weatherThree[7].main.temp) / 4))}°C`;

    this.dayTempFour.textContent = `${Math.round(((weatherFour[3].main.temp 
      + weatherFour[4].main.temp + weatherFour[5].main.temp 
      + weatherFour[6].main.temp) / 4))}°C`;
    this.nightTempFour.textContent = `${Math.round(((weatherFour[0].main.temp 
      + weatherFour[1].main.temp + weatherFour[2].main.temp 
      + weatherFour[7].main.temp) / 4))}°C`;

    this.dayTempFive.textContent = `${Math.round(((weatherFive[3].main.temp 
      + weatherFive[4].main.temp + weatherFive[5].main.temp 
      + weatherFive[6].main.temp) / 4))}°C`;
    this.nightTempFive.textContent = `${Math.round(((weatherFive[0].main.temp 
      + weatherFive[1].main.temp + weatherFive[2].main.temp 
      + weatherFive[7].main.temp) / 4))}°C`;

    this.realFeelOne.textContent = `${Math.round(weatherOne[0].main.feels_like)}°C`;
    this.realFeelTwo.textContent = `${Math.round(((weatherTwo[0].main.feels_like 
      + weatherTwo[1].main.feels_like + weatherTwo[2].main.feels_like 
      + weatherTwo[3].main.feels_like + weatherTwo[4].main.feels_like 
      + weatherTwo[5].main.feels_like + weatherTwo[6].main.feels_like 
      + weatherTwo[7].main.feels_like) / 8))}°C`;
    this.realFeelThree.textContent = `${Math.round(((weatherThree[0].main.feels_like 
      + weatherThree[1].main.feels_like + weatherThree[2].main.feels_like 
      + weatherThree[3].main.feels_like + weatherThree[4].main.feels_like 
      + weatherThree[5].main.feels_like + weatherThree[6].main.feels_like 
      + weatherThree[7].main.feels_like) / 8))}°C`;
    this.realFeelFour.textContent = `${Math.round(((weatherFour[0].main.feels_like 
      + weatherFour[1].main.feels_like + weatherFour[2].main.feels_like 
      + weatherFour[3].main.feels_like + weatherFour[4].main.feels_like 
      + weatherFour[5].main.feels_like + weatherFour[6].main.feels_like 
      + weatherFour[7].main.feels_like) / 8))}°C`;
    this.realFeelFive.textContent = `${Math.round(((weatherFive[0].main.feels_like 
      + weatherFive[1].main.feels_like + weatherFive[2].main.feels_like 
      + weatherFive[3].main.feels_like + weatherFive[4].main.feels_like 
      + weatherFive[5].main.feels_like + weatherFive[6].main.feels_like 
      + weatherFive[7].main.feels_like) / 8))}°C`;
  }

  findDayOfWeek( date ) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const dayOfWeek = days[date.getDay()];

    return dayOfWeek;
  }

  filterDate(fiveDayCityWeather, n) {
    const nowDate = new Date(fiveDayCityWeather.list[0].dt_txt);

    const dayMonth = nowDate.getDate() + n;

    const resDates = [];

    fiveDayCityWeather.list.forEach((e => {
        const date = new Date(e.dt_txt);

        const dayMonthArray = date.getDate();

        if(dayMonth === dayMonthArray){
            resDates.push(e);
        }
    }));

    return resDates;
  }

  addIcon(array) {
    const iconArray = [];
    let icon;

    array.forEach((e => {
      iconArray.push(e.weather[0].icon);
    }));

    iconArray.forEach((e => {
      switch (e) {
        case '13d': 
          icon = '13d';

          break;
        case '13n':
          icon = '13d';

          break;
        case '11d':
          icon = '11d';

          break;
        case '11n':
          icon = '11d';

          break;
        case '09d':
          icon = '09d';

          break;
        case '09n':
          icon = '09d';

          break;
        case '10d':
          icon = '10d';

          break;
        case '10n':
          icon = '10d';

          break;
        case '50d':
          icon = '50d';

          break;
        case '50n':
          icon = '50d';

          break;
        case '04d':
          icon = '04d';

          break;
        case '04n':
          icon = '04d';

          break;
        case '03d':
          icon = '03d';

          break;
        case '03n':
          icon = '03d';

          break;
        case '02d':
          icon = '02d';

          break;
        case '02n':
          icon = '02d';

          break;
        case '01d':
          icon = '01d';

          break;
        case '01n':
          icon = '01d';

          break;
      }
    }));
    
    return icon;
  }

  addCityRecentPlace(city) {
    const cityItemRecentPlace = this.createCityItemRecentPlace(city);

    this.addCityItemRecentPlaceToList(cityItemRecentPlace);
  }

  createCityItemRecentPlace(city) {
    const nameCity = this.domElementBuilder.createDiv(city.name);
    const cityTemp = this.domElementBuilder.createDiv(`${Math.round(city.main.temp)} °C`);
    const weatherСonditions = this.domElementBuilder.createDiv(city.weather[0].main);
    const deleteButton = this.domElementBuilder.createDeleteButton([{ event: 'click', handler: this.handleDelete }], city);

    return this.domElementBuilder.createListItemRecentPlace([{prop: 'data-id', value: city.id }], [nameCity, cityTemp, weatherСonditions, deleteButton]);
  }

  addCityItemRecentPlaceToList (cityItemRecentPlace) {
    this.cityListRecentPlace.prepend(cityItemRecentPlace);
  }

  handleDelete(event) {
    const cityItemRecentPlace = event.target.closest('.recent-place-cart')

    const id = +cityItemRecentPlace.dataset.id;

    this.emit('delete', id );
  }

  deleteCityItemRecentPlace(id) {
    const cityItemRecentPlace = this.cityListRecentPlace.querySelector(`[data-id="${id}"]`);
  
    cityItemRecentPlace.remove();
  }
}
