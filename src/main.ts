import { Controller } from './controller'

const controller = new Controller();
document.getElementById('taskbtn')?.addEventListener('click', controller.taskClickEvent);
document.getElementById('schedulebtn')?.addEventListener('click', controller.scheduleClickEvent)
