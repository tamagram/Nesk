import * as interfaces from './interfaces'

export class Model implements interfaces.Model {
    getTaskGroup = (): interfaces.EnteredValuesOfTask[] => {
        // console.log("call getTaskGroup");
        return JSON.parse(localStorage.getItem('task') || '[]');//nullの時デフォルト値[]
    }
    setTaskGroup = (_param: interfaces.EnteredValuesOfTask | interfaces.EnteredValuesOfTask[]) => {
        // console.log("call setTaskGroup");
        if (Array.isArray(_param)) {
            localStorage.setItem('task', JSON.stringify(_param));
        } else {
            let _tmp = this.getTaskGroup();
            _tmp.push(_param);
            localStorage.setItem('task', JSON.stringify(_tmp));
        }
    }

    getRepeatTaskGroup = (): interfaces.EnteredValuesOfTask[] => {
        // console.log("call getRepeatTaskGroup");
        return JSON.parse(localStorage.getItem('repeatTask') || '[]');
    }
    setRepeatTaskGroup = (_param: interfaces.EnteredValuesOfTask | interfaces.EnteredValuesOfTask[]) => {
        // console.log("call setRepeatTaskGroup");
        if (Array.isArray(_param)) {
            localStorage.setItem('repeatTask', JSON.stringify(_param));
        } else {
            let _tmp = this.getRepeatTaskGroup();
            _tmp.push(_param);
            localStorage.setItem('repeatTask', JSON.stringify(_tmp));
        }
    }

    _getDateTimeArray = () => {
        //return [YYYY-MM-DD,HH:MM] now
        let _date = new Date();
        return [_date.getFullYear() + '-' + ('00' + (_date.getMonth() + 1)).slice(-2) + '-' + ('00' + _date.getDate()).slice(-2),
        ('00' + _date.getHours()).slice(-2) + ':' + ('00' + _date.getMinutes()).slice(-2)];
    }
    getScheduleGroup = (): interfaces.EnteredValuesOfSchedule[] => {
        // console.log("call getScheduleGroup");
        let _tmp = JSON.parse(localStorage.getItem('schedule') || '[]') as interfaces.EnteredValuesOfSchedule[];
        let _dateTimeArray = this._getDateTimeArray();
        // console.log(_dateTimeArray);
        _tmp = _tmp.filter(_schedule => _schedule.yyyymmdd > _dateTimeArray[0] || (_schedule.yyyymmdd === _dateTimeArray[0] && _schedule.hhmm >= _dateTimeArray[1]));
        localStorage.setItem('schedule', JSON.stringify(_tmp));
        return _tmp;
    }
    _dateTimeSort = (_enteredValuesOfSchedules: interfaces.EnteredValuesOfSchedule[]) => {
        //時間昇順ソート
        _enteredValuesOfSchedules.sort(function (a, b) {
            return (a.hhmm < b.hhmm) ? -1 : 1;
        });
        //日付昇順ソート
        _enteredValuesOfSchedules.sort(function (a, b) {
            return (a.yyyymmdd < b.yyyymmdd) ? -1 : 1;
        });
        return _enteredValuesOfSchedules;
    }
    _isCalendarIdOverlapping = (_schedule: interfaces.EnteredValuesOfSchedule) => {
        let target = this.getScheduleGroup().filter(object => {
            // idが「1」の配列のみ返します。
            return object.id == _schedule.id;
        }).shift()

        return target != undefined;
    }
    returnJsonProgression = () => {
        let json = {};
        this.getScheduleGroup().forEach(schedule => {
            let unixtime = new Date(schedule.yyyymmdd).getTime() / 1000;
            if (unixtime in json) {
                json[unixtime] += 1;
            } else {
                json[unixtime] = 1;
            }
        })
        console.log('jsonCall');
        console.log(json);
        return json;
    }
    setScheduleGroup = (_params: interfaces.EnteredValuesOfSchedule | interfaces.EnteredValuesOfSchedule[]) => {
        console.log("call setScheduleGroup");
        if (Array.isArray(_params)) {
            let filtered: interfaces.EnteredValuesOfSchedule[] = [];
            console.log(_params);
            _params.forEach(_schedule => {
                if (!this._isCalendarIdOverlapping(_schedule)){
                    filtered.push(_schedule);
                } 
            });
            console.log(filtered);
            localStorage.setItem('schedule', JSON.stringify(this._dateTimeSort(filtered.concat(this.getScheduleGroup()))));

        } else {
            if (!this._isCalendarIdOverlapping(_params)) {
                let _tmp = this.getScheduleGroup();
                _tmp.push(_params);
                _tmp = this._dateTimeSort(_tmp);
                localStorage.setItem('schedule', JSON.stringify(_tmp));
            }
        }
    }
}