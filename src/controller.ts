import * as interfaces from './interfaces'
import { Model } from './model'
import { View } from './view'

export class Controller implements interfaces.Controller {
    private Model!: Model;
    View!: View;
    private _enteredValuesOfTask: interfaces.EnteredValuesOfTask;
    private _enteredValuesOfSchedule: interfaces.EnteredValuesOfSchedule;
    private _taskGroup: interfaces.EnteredValuesOfTask[];
    private _repeatTaskGroup: interfaces.EnteredValuesOfTask[];
    private _sheduleGroup: interfaces.EnteredValuesOfSchedule[];
    constructor() {
        this.Model = new Model();
        this.View = new View(this, this.Model);
    }
    taskClickEvent = () => {
        console.log("clickedTaskForm");
        if (!((document.getElementById("taskName") as HTMLInputElement).value &&
            (document.getElementById("taskDetails") as HTMLInputElement).value)) {
            return;
        }
        this._enteredValuesOfTask = {
            taskName: (document.getElementById("taskName") as HTMLInputElement).value,
            taskDetails: (document.getElementById("taskDetails") as HTMLInputElement).value,
            important: (document.getElementById("taskImportant") as HTMLInputElement).checked,
            repeat: (document.getElementById("taskRepeat") as HTMLInputElement).checked,
        }
        console.log(this._enteredValuesOfTask);
        this.Model.setTaskGroup(this._enteredValuesOfTask);
        this.View.rendering();
        return false;
    }
    scheduleClickEvent = () => {
        console.log("clickedScheduleForm");
        if (!((document.getElementById("scheduleName") as HTMLInputElement).value &&
            (document.getElementById("scheduleDetails") as HTMLInputElement).value)) {
            return;
        }
        this._enteredValuesOfSchedule = {
            scheduleName: (document.getElementById("scheduleName") as HTMLInputElement).value,
            scheduleDetails: (document.getElementById("scheduleDetails") as HTMLInputElement).value,
            yyyymmdd: (document.getElementById("scheduleDate") as HTMLInputElement).value,
            hhmm: (document.getElementById("scheduleTime") as HTMLInputElement).value,
        }
        console.log(this._enteredValuesOfSchedule);
        this.Model.setScheduleGroup(this._enteredValuesOfSchedule);
        this.View.rendering();
        return false;
    }
    delClickEvent = () => {
        console.log("clickedDelEvent");
    }
    doneClickEvent = () => {
        console.log("clickedDoneEvent");
    }
    passClickEvent = () => {
        console.log("clickedPassEvent");

    }
}