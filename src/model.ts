import * as interfaces from './interfaces'

export class Model implements interfaces.Model {
    constructor(){
        console.log("ModelInstanceCreated");
    }
    private _tmp: interfaces.EnteredValuesOfTask[] | interfaces.EnteredValuesOfSchedule[] = [];
    get getTaskGroup(): interfaces.EnteredValuesOfTask[] {
        return JSON.parse(localStorage.getItem('task')!);
    }
    set setTaskGroup(_params: interfaces.EnteredValuesOfTask | interfaces.EnteredValuesOfTask[]) {
        if (!this.getTaskGroup) localStorage.setItem("task", "[]");
        if (Array.isArray(_params)) {
            localStorage.removeItem('task');
            localStorage.setItem('task', JSON.stringify(_params));
        } else {
            this._tmp = this.getTaskGroup;
            this._tmp.push(_params);
            localStorage.removeItem('task');
            localStorage.setItem('task', JSON.stringify(this._tmp));
        }
    }
    get getScheduleGroup(): interfaces.EnteredValuesOfSchedule[] {
        return JSON.parse(localStorage.getItem('schedule')!);
    }
    set setScheduleGroup(_params: interfaces.EnteredValuesOfSchedule | interfaces.EnteredValuesOfSchedule[]) {
        if (!this.getScheduleGroup) localStorage.setItem("task", "[]");
        if (Array.isArray(_params)) {
            localStorage.removeItem('schedule');
            localStorage.setItem('schedule', JSON.stringify(_params));
        } else {
            this._tmp = this.getScheduleGroup;
            this._tmp.push(_params);
            localStorage.removeItem('schedule');
            localStorage.setItem('schedule', JSON.stringify(this._tmp));
        }
    }
}