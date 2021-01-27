import * as interfaces from './interfaces'
import { Controller } from './controller'
import { Model } from './model'

export class View implements interfaces.View {
    private _Controller!: Controller;
    private _Model!: Model;
    constructor(_instanceController: Controller, _instanceModel: Model) {
        this._Controller = _instanceController;
        this._Model = _instanceModel;
    }
    rendering() {
        document.querySelectorAll(".card").forEach(_element => {
            _element.remove();
        });
        document.querySelectorAll(".list-group-item").forEach(_element => {
            _element.remove();
        })
        if (this._Model.getTaskGroup) {
            this._Model.getTaskGroup.forEach((_element, _index) => {
                if (_index === 0) {
                    document.querySelector("#taskCardInsert")!.append(
                        `<div class="card text-white bg-info mb-3">
                                        <div class="card-body">
                                            <h5 class="card-title">${_element.taskName}</h5>
                                            <p class="card-text">
                                                ${_element.taskDetails}
                                            </p>
                                            ${_element.important}
                                        </div>
                                        <div class="card-footer bg-dark rounded">
                                            <div class="row">
                                                <button type="button" id="passbtn" onclick="controller.passClickEvent()" class="btn btn-outline-danger col-auto mr-auto mx-4">Pass</button>
                                                <button type="button" id="donebtn" onclick="controller.doneClickEvent()" class="btn btn-outline-success col-auto mx-4">Done!</button>
                                            </div>
                                        </div>
                                    </div>`
                    );
                    document.querySelector('#passbtn')?.addEventListener('click', this._Controller.passClickEvent);
                    document.querySelector('#donebtn')?.addEventListener('click', this._Controller.doneClickEvent);
                } else {
                    document.querySelector("#taskCardInsert")!.append(
                        `<div class="card text-white bg-info mb-3">
                                    <div class="card-body">
                                        <h5 class="card-title">${_element.taskName}</h5>
                                        <p class="card-text">
                                            ${_element.taskDetails}
                                        </p>
                                        ${_element.important}
                                    </div>
                                </div>`
                    )
                }
            });
        }
        if (this._Model.getScheduleGroup) {
            this._Model.getScheduleGroup.forEach((_element, _index) => {
                document.querySelector("#scheduleCardInsert")!.append(
                    `<div class="card text-white bg-info mb-3">
                            <div class="card-body">
                                <h5 class="card-title">${_element.scheduleName}</h5>
                                <p class="card-text">${_element.scheduleDetails}</p>
                            </div>
                            <div class="card-footer bg-dark rounded">
                            <div class="row">
                                <input type="date" class="form-control col my-1 mx-2" value=${_element.yyyymmdd} readonly>
                                <input type="time" class="form-control col my-1 mx-2" value=${_element.hhmm} readonly>
                            </div>
                        </div>`
                );
            });
        }
    }
}