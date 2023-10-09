class DomHelper {

  createCityButton(attributes ,handlers, city) {
    return this.createElement({
      tag: 'button',
      attributes,
      classList: ['city-item-btn'],
      textContent: `${city.name}, ${city.country} (${city.lat}, ${city.lon})`,
      handlers,
    });
  }

  createDeleteButton(handlers) {
    return this.createElement({
      tag: 'button',
      classList: ['btn', 'city-item-btn-delete'],
      textContent: 'X',
      handlers,
    });
  }

  createListItem(children) {
    return this.createElement({
      tag: 'li',
      classList: ['city-item'],
      children,
      childrenAction: 'append',
    });
  }

  createListItemRecentPlace(attributes, children) {
    return this.createElement({
      tag: 'li',
      classList: ['recent-place-cart'],
      attributes,
      children,
      childrenAction: 'append',
    });
  }

  createDiv (city) {
    return this.createElement({
    tag: 'div',
    textContent: city,
    });
  }

  createElement({
    tag,
    classList,
    attributes,
    textContent,
    handlers,
    children,
    childrenAction,
  }) {
    const element = document.createElement(tag);

    if (classList?.length) {
      element.classList.add(...classList);
    }

    if (attributes?.length) {
      attributes.forEach(({ prop, value }) => {
        element.setAttribute(prop, value);
      });
    }

    if (textContent) {
      element.textContent = textContent;
    }

    if (handlers?.length) {
      handlers.forEach(({ event, handler}) => {
        element.addEventListener(event, handler);
      });
    }

    if (children) {
      element[childrenAction](...children);
    }

    return element;
  }
}
