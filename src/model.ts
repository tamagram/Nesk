import * as interfaces from './interfaces'

export class Model implements interfaces.Model {
    private _tmp: interfaces.EnteredValuesOfTask[] | interfaces.EnteredValuesOfSchedule[] = [];
    getTaskGroup = (): interfaces.EnteredValuesOfTask[] => {
        console.log("call getTaskGroup");
        return JSON.parse(localStorage.getItem('task')!);
    }
    setTaskGroup = (_params: interfaces.EnteredValuesOfTask | interfaces.EnteredValuesOfTask[]) => {
        console.log("call setTaskGroup");
        if (!this.getTaskGroup()) localStorage.setItem("task", "[]");
        if (Array.isArray(_params)) {
            localStorage.removeItem('task');
            localStorage.setItem('task', JSON.stringify(_params));
        } else {
            this._tmp = this.getTaskGroup();
            this._tmp.push(_params);
            localStorage.removeItem('task');
            localStorage.setItem('task', JSON.stringify(this._tmp));
        }
    }
    getScheduleGroup = (): interfaces.EnteredValuesOfSchedule[] => {
        console.log("call getScheduleGroup");
        return JSON.parse(localStorage.getItem('schedule')!);
    }
    setScheduleGroup = (_params: interfaces.EnteredValuesOfSchedule | interfaces.EnteredValuesOfSchedule[]) => {
        console.log("call setScheduleGroup");
        if (!this.getScheduleGroup()) localStorage.setItem("task", "[]");
        if (Array.isArray(_params)) {
            localStorage.removeItem('schedule');
            localStorage.setItem('schedule', JSON.stringify(_params));
        } else {
            this._tmp = this.getScheduleGroup();
            this._tmp.push(_params);
            localStorage.removeItem('schedule');
            localStorage.setItem('schedule', JSON.stringify(this._tmp));
        }
    }
}