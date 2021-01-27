import * as interfaces from './interfaces'
import { Model } from './model'
import { View } from './view';

export class Controller implements interfaces.Controller {
    private Model!: Model;
    View!: View;
    constructor() {
        this.Model = new Model();
        this.View = new View(this,this.Model);
    }
    taskClickEvent() {
        console.log("clickedTaskForm");
    }
    scheduleClickEvent() {
        console.log("clickedScheduleForm");
    }
    delClickEvent() {
        console.log("clickedDelEvent");
    }
    doneClickEvent() {
        console.log("clickedDoneEvent");
    }
    passClickEvent() {
        console.log("clickedPassEvent");
    }
}