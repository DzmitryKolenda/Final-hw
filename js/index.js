const model = new Model();
const view = new View(new DomHelper());
const controller = new Controller(model, view);

controller.init();