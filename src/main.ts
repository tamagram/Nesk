import { Controller } from './controller'

const controller = new Controller();
controller.Authorization.writeCookie();
controller.View.rendering();
document.getElementById("taskbtn")!.addEventListener('click', controller.taskClickEvent);
document.getElementById("schedulebtn")!.addEventListener('click', controller.scheduleClickEvent)
document.getElementById("taskRepeatBtn")!.addEventListener('click', controller.repeatTaskClickEvent);
document.getElementById('signInButton')!.addEventListener('click', controller.signInClickEvent);
document.getElementById('signOutButton')!.addEventListener('click', controller.signOutClickEvent); 