import { Controller } from './controller'

const controller = new Controller();
controller.View.rendering();
document.querySelector("#taskbtn")?.addEventListener('click', controller.taskClickEvent);
document.querySelector("#schedulebtn")?.addEventListener('click', controller.scheduleClickEvent)
