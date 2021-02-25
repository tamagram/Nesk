import * as interfaces from './interfaces'
import * as gapi from './import/gapi'
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

    //フォーム入力値の無害化
    _sanitaize = (_str: string) => {
        return _str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    //クリックイベント
    taskClickEvent = () => {
        console.log("clickedTaskForm");
        if (!((document.getElementById("taskName") as HTMLInputElement).value &&
            (document.getElementById("taskDetails") as HTMLInputElement).value)) {
            return;
        }
        this._enteredValuesOfTask = {
            taskName: this._sanitaize((document.getElementById("taskName") as HTMLInputElement).value),
            taskDetails: this._sanitaize((document.getElementById("taskDetails") as HTMLInputElement).value),
            important: (document.getElementById("taskImportant") as HTMLInputElement).checked,
            repeat: (document.getElementById("taskRepeat") as HTMLInputElement).checked,
        }
        // console.log(this._enteredValuesOfTask);
        this.Model.setTaskGroup(this._enteredValuesOfTask);
        this.View.rendering();
        return false;
    }

    repeatTaskClickEvent = () => {
        //repeatTaskの配列をtaskへ移動
        this.Model.setTaskGroup(this.Model.getRepeatTaskGroup());
        this.Model.setRepeatTaskGroup([]);
        this.View.rendering();
    }

    scheduleClickEvent = () => {
        console.log("clickedScheduleForm");
        if (!((document.getElementById("scheduleName") as HTMLInputElement).value &&
            (document.getElementById("scheduleDetails") as HTMLInputElement).value)) {
            return;
        }
        this._enteredValuesOfSchedule = {
            scheduleName: this._sanitaize((document.getElementById("scheduleName") as HTMLInputElement).value),
            scheduleDetails: this._sanitaize((document.getElementById("scheduleDetails") as HTMLInputElement).value),
            yyyymmdd: (document.getElementById("scheduleDate") as HTMLInputElement).value,
            hhmm: (document.getElementById("scheduleTime") as HTMLInputElement).value,
        }
        console.log(this._enteredValuesOfSchedule);
        this.Model.setScheduleGroup(this._enteredValuesOfSchedule);
        this.View.rendering();
        return false;
    }

    delClickEvent = (_localstorageKey: string, _index?: number) => {
        //_indexの要素を削除しlocalstorageへ
        // this.Model.setTaskGroup(this.Model.getTaskGroup().splice(1, _index));の場合取り出された値が入ってしまう
        // alert("clickedDelEvent" + _index + JSON.stringify(this.Model.getTaskGroup()));
        if (_localstorageKey === 'task' && _index !== null) {
            this._taskGroup = this.Model.getTaskGroup();
            this._taskGroup.splice(_index, 1);
            this.Model.setTaskGroup(this._taskGroup);
            this.View.rendering();
            return;
        } else if (_localstorageKey === 'task' && _index === null) {
            this.Model.setTaskGroup([]);
            this.View.rendering();
        }
        if (_localstorageKey === 'repeatTask' && _index !== null) {
            this._repeatTaskGroup = this.Model.getRepeatTaskGroup();
            this._repeatTaskGroup.splice(_index, 1);
            this.Model.setRepeatTaskGroup(this._repeatTaskGroup);
            this.View.rendering();
            return;
        } else if (_localstorageKey === 'repeatTask' && _index === null) {
            this.Model.setRepeatTaskGroup([]);
            this.View.rendering();
        }
    }

    doneClickEvent = () => {
        //alert("clickedDoneEvent");
        this._taskGroup = this.Model.getTaskGroup();
        if (this._taskGroup[0].repeat) {
            this.Model.setRepeatTaskGroup(this._taskGroup[0]);
        }
        //shift()による破壊
        this._taskGroup.shift();
        this.Model.setTaskGroup(this._taskGroup);
        this.View.rendering();
    }

    passClickEvent = () => {
        // alert("clickedPassEvent");
        this._taskGroup = this.Model.getTaskGroup();
        //0番目を末尾へ
        this._taskGroup.push(this._taskGroup.shift());
        this.Model.setTaskGroup(this._taskGroup);
        this.View.rendering();
    }

    signInClickEvent = () => {
        alert('signInClickEvent');
        gapi.oauthSignIn();
        //ログイン後情報取得しレンダリング
    }

    signOutClickEvent = () => {
        alert('signInClickEvent');
        gapi.oauthSignOut();
    }
}