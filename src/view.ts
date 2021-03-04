import * as interfaces from './interfaces'
import { Controller } from './controller'
import { Model } from './model'

export class View implements interfaces.View {
    private _Controller!: Controller;
    private _Model!: Model;
    constructor(_instanceController: Controller, _instanceModel: Model) {
        this._Controller = _instanceController;
        this._Model = _instanceModel;
        var cal1 = new CalHeatMap();
        var cal2 = new CalHeatMap();
        let halfAYear = new Date();
        halfAYear.setMonth(halfAYear.getMonth() - 6);
        cal1.init({
            itemSelector: "#cal-heatmap-contribution",
            domain: "month",
            start: halfAYear,
            data: "contribution.json",
            cellSize: 9,
            range: 6,
            previousSelector: "#contribution-b-PreviousDomain-selector",
            nextSelector: "#contribution-b-NextDomain-selector",
            displayLegend: false,
            legend: [1, 2, 4, 7]
        });
        cal2.init({
            itemSelector: "#cal-heatmap-progression",
            domain: "month",
            data: "progression.json",
            cellSize: 9,
            range: 6,
            previousSelector: "#progression-b-PreviousDomain-selector",
            nextSelector: "#progression-b-NextDomain-selector",
            displayLegend: false,
            legend: [1, 2, 4, 7]
        });
    }

    rendering = (_isSignedIn?: boolean) => {
        // console.log('call rendering');
        //一度消去
        document.querySelectorAll('.card').forEach(_element => {
            _element.remove();
        });
        document.querySelectorAll('.list-group-item').forEach(_element => {
            _element.remove();
        });

        //taskGroupの表示
        if (this._Model.getTaskGroup().length) {
            this._Model.getTaskGroup().forEach(_element => {
                document.getElementById('taskList')!.insertAdjacentHTML('beforeend',
                    `<li class='list-group-item text-wrap'>${_element.taskName},${_element.taskDetails}
                    <button type=button class="btn btn-danger taskDeleteBtn float-right">削除</button>
                    </li>`
                );
            });
            document.querySelectorAll('.taskDeleteBtn').forEach((_element, _index) => {
                _element.addEventListener('click', () => {
                    this._Controller.delClickEvent('task', _index);
                });
            });

            document.getElementById('taskAlert')!.style.display = 'none';
            document.getElementById('taskRepeatBtn')!.style.display = 'none';
            this._Model.getTaskGroup().forEach((_element, _index) => {
                if (_index === 0) {
                    document.querySelector("#taskCardInsert")!.insertAdjacentHTML('beforeend',
                        `<div class="card text-white ${_element.important ? 'bg-danger' : 'bg-info'} mb-3">
                                        <div class="card-body">
                                            <h5 class="card-title">${_element.taskName}</h5>
                                            <p class="card-text">
                                                ${_element.taskDetails}
                                            </p>
                                        </div>
                                        <div class="card-footer bg-dark rounded">
                                            <div class="row">
                                                <button type="button" id="passbtn" class="btn btn-outline-danger col-auto mr-auto mx-4">Pass</button>
                                                <button type="button" id="donebtn" class="btn btn-outline-success col-auto mx-4">Done!</button>
                                            </div>
                                        </div>
                                    </div>`
                    );
                    document.querySelector('#passbtn')?.addEventListener('click', this._Controller.passClickEvent);
                    document.querySelector('#donebtn')?.addEventListener('click', this._Controller.doneClickEvent);
                } else {
                    document.querySelector("#taskCardInsert")!.insertAdjacentHTML('beforeend',
                        `<div class="card text-white ${_element.important ? 'bg-danger' : 'bg-info'} mb-3">
                                    <div class="card-body">
                                        <h5 class="card-title">${_element.taskName}</h5>
                                        <p class="card-text">
                                            ${_element.taskDetails}
                                        </p>
                                    </div>
                                </div>`
                    )
                }
            });
        } else {
            document.getElementById('taskAlert')!.style.display = 'block';
            document.getElementById('taskRepeatBtn')!.style.display = 'block';
        }

        //repeatTaskGroupの表示
        if (this._Model.getRepeatTaskGroup().length) {
            this._Model.getRepeatTaskGroup().forEach(_element => {
                document.getElementById('repeatList')!.insertAdjacentHTML('beforeend',
                    `<li class='list-group-item text-wrap'>${_element.taskName},${_element.taskDetails}
                    <button type=button class="btn btn-danger repeatTaskDeleteBtn float-right">削除</button>
                    </li>`
                );
            });
        }
        document.querySelectorAll('.repeatTaskDeleteBtn').forEach((_element, _index) => {
            _element.addEventListener('click', () => {
                this._Controller.delClickEvent('repeatTask', _index);
            });
        });

        //scheduleGroupの表示
        if (this._Model.getScheduleGroup().length) {
            document.getElementById('scheduleAlert')!.style.display = 'none';
            this._Model.getScheduleGroup().forEach((_element, _index) => {
                document.querySelector("#scheduleCardInsert")!.insertAdjacentHTML('beforeend',
                    `<div class="card text-white bg-info mb-3">
                            <div class="card-body">
                                <h5 class="card-title">${_element.scheduleName}</h5>
                                <p class="card-text">${_element.scheduleDetails?.replace(/(https:\/\/[\x21-\x7e]+\/[\x21-\x7e]+)/gi, "<a href='$1' class='text-warning'>$1</a>") || "詳細なし"}</p>
                            </div>
                            <div class="card-footer bg-dark rounded">
                            <div class="row">
                                <input type="date" class="form-control col my-1 mx-2" value=${_element.yyyymmdd} readonly>
                                <input type="time" class="form-control col my-1 mx-2" value=${_element.hhmm} readonly>
                            </div>
                        </div>`
                );
            });
        } else {
            document.getElementById('scheduleAlert')!.style.display = 'block';
        }

        //フォームに日付と時間をセット
        let _date = new Date();
        (document.getElementById('scheduleDate') as HTMLInputElement)!.value = _date.getFullYear() + '-' + ('00' + (_date.getMonth() + 1)).slice(-2) + '-' + ('00' + _date.getDate()).slice(-2);
        (document.getElementById('scheduleTime') as HTMLInputElement)!.value = ('00' + _date.getHours()).slice(-2) + ':' + ('00' + _date.getMinutes()).slice(-2);
    }
}