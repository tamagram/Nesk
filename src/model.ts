import * as interfaces from './interfaces'

export class Model implements interfaces.Model {
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
            let _tmp = this.getTaskGroup();
            _tmp.push(_param);
            localStorage.removeItem('task');
            localStorage.setItem('task', JSON.stringify(_tmp));
        }
    }

    getRepeatTaskGroup = () => {
        // console.log("call getRepeatTaskGroup");
        return JSON.parse(localStorage.getItem('repeatTask') || '[]');
    }
    setRepeatTaskGroup = (_param) => {
        // console.log("call setRepeatTaskGroup");
        if (Array.isArray(_param)) {
            localStorage.removeItem('repeatTask');
            localStorage.setItem('repeatTask', JSON.stringify(_param));
        } else {
            let _tmp = this.getRepeatTaskGroup();
            _tmp.push(_param);
            localStorage.removeItem('repeatTask');
            localStorage.setItem('repeatTask', JSON.stringify(_tmp));
        }
    }

    getScheduleGroup = (): interfaces.EnteredValuesOfSchedule[] => {
        // console.log("call getScheduleGroup");
        return JSON.parse(localStorage.getItem('schedule') || '[]');
    }
    _dateTimeSort = (_enteredValuesOfSchedule: interfaces.EnteredValuesOfSchedule[]) => {
        //時間昇順ソート
        _enteredValuesOfSchedule.sort(function (a, b) {
            return (a.hhmm < b.hhmm) ? -1 : 1;
        });
        //日付昇順ソート
        _enteredValuesOfSchedule.sort(function (a, b) {
            return (a.yyyymmdd < b.yyyymmdd) ? -1 : 1;
        });
        return _enteredValuesOfSchedule;
    }
    setScheduleGroup = (_params: interfaces.EnteredValuesOfSchedule | interfaces.EnteredValuesOfSchedule[]) => {
        // console.log("call setScheduleGroup");
        if (Array.isArray(_params)) {
            localStorage.removeItem('schedule');
            localStorage.setItem('schedule', JSON.stringify(this._dateTimeSort(_params)));
        } else {
            let _tmp = this.getScheduleGroup();
            _tmp.push(_params);
            _tmp = this._dateTimeSort(_tmp);
            localStorage.removeItem('schedule');
            localStorage.setItem('schedule', JSON.stringify(_tmp));
        }
    }
}