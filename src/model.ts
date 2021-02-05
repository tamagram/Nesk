import * as interfaces from './interfaces'

export class Model implements interfaces.Model {
    private _tmp: interfaces.EnteredValuesOfTask[] | interfaces.EnteredValuesOfSchedule[] = [];
    getTaskGroup = (): interfaces.EnteredValuesOfTask[] => {
        // console.log("call getTaskGroup");
        return JSON.parse(localStorage.getItem('task') || '[]');//nullの時デフォルト値[]
    }
    setTaskGroup = (_param: interfaces.EnteredValuesOfTask | interfaces.EnteredValuesOfTask[]) => {
        // console.log("call setTaskGroup");
        if (Array.isArray(_param)) {
            localStorage.removeItem('task');
            localStorage.setItem('task', JSON.stringify(_param));
        } else {
            this._tmp = this.getTaskGroup();
            this._tmp.push(_param);
            localStorage.removeItem('task');
            localStorage.setItem('task', JSON.stringify(this._tmp));
        }
    }

    getRepeatTaskGroup = () => {
        console.log("call getRepeatTaskGroup");
        return JSON.parse(localStorage.getItem('repeatTask') || '[]');
    }
    setRepeatTaskGroup = (_param) => {
        console.log("call setRepeatTaskGroup");
        if (Array.isArray(_param)) {
            localStorage.removeItem('repeatTask');
            localStorage.setItem('repeatTask', JSON.stringify(_param));
        } else {
            this._tmp = this.getRepeatTaskGroup();
            this._tmp.push(_param);
            localStorage.removeItem('repeatTask');
            localStorage.setItem('repeatTask', JSON.stringify(this._tmp));
        }
    }

    getScheduleGroup = (): interfaces.EnteredValuesOfSchedule[] => {
        // console.log("call getScheduleGroup");
        return JSON.parse(localStorage.getItem('schedule') || '[]');
    }
    setScheduleGroup = (_params: interfaces.EnteredValuesOfSchedule | interfaces.EnteredValuesOfSchedule[]) => {
        // console.log("call setScheduleGroup");
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