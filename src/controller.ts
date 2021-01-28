import * as interfaces from './interfaces'
import { Model } from './model'
import { View } from './view'

export class Controller implements interfaces.Controller {
    private Model!: Model;
    private View!: View;
    private _enteredValuesOfTask: interfaces.EnteredValuesOfTask;
    private _enteredValuesOfSchedule: interfaces.EnteredValuesOfSchedule;
    private _taskGroup: interfaces.EnteredValuesOfTask[];
    private _repeatTaskGroup: interfaces.EnteredValuesOfTask[];
    private _sheduleGroup: interfaces.EnteredValuesOfSchedule[];
    constructor() {
        this.Model = new Model();
        this.View = new View(this, this.Model);
    }
    taskClickEvent() {
        alert("clickedTaskForm");
        if (!((document.getElementById("taskName") as HTMLInputElement).value && (document.getElementById("taskDetails") as HTMLInputElement).value)) {
            return;
        }
        this._enteredValuesOfTask = {
            taskName: (document.getElementById("taskName") as HTMLInputElement).value,
            taskDetails: (document.getElementById("taskDetails") as HTMLInputElement).value,
            important: (document.getElementById("taskImportant") as HTMLInputElement).checked,
            repeat: (document.getElementById("taskRepeat") as HTMLInputElement).checked,
        }
        console.log(this._enteredValuesOfTask);
        this.Model.setTaskGroup = this._enteredValuesOfTask;
        return false;
    }
    scheduleClickEvent() {
        alert("clickedScheduleForm");
    }
    delClickEvent() {
        alert("clickedDelEvent");
    }
    doneClickEvent() {
        alert("clickedDoneEvent");
    }
    passClickEvent() {
        alert("clickedPassEvent");

    }
}