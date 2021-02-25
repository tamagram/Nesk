import { handleClientLoad } from './import/gapi';
import { Controller } from './controller'
export const controller = new Controller();
controller.View.rendering();
handleClientLoad();
document.getElementById("taskbtn")!.addEventListener('click', controller.taskClickEvent);
document.getElementById("schedulebtn")!.addEventListener('click', controller.scheduleClickEvent)
document.getElementById("taskRepeatBtn")!.addEventListener('click', controller.repeatTaskClickEvent);
document.getElementById('signInButton')!.addEventListener('click', controller.signInClickEvent);
document.getElementById('signOutButton')!.addEventListener('click', controller.signOutClickEvent); 