export interface EnteredValuesOfTask {
    taskName: string,
    taskDetails: string,
    repeat: boolean,
    important: boolean,
}

export interface EnteredValuesOfSchedule {
    scheduleName: string,
    scheduleDetails: string,
    yyyymmdd: string,
    hhmm: string,
}

export interface Model {
    getTaskGroup(): EnteredValuesOfTask[];
    setTaskGroup(_param: EnteredValuesOfTask | EnteredValuesOfTask[]): void;
    getRepeatTaskGroup(): EnteredValuesOfTask[];
    setRepeatTaskGroup(_param: EnteredValuesOfTask | EnteredValuesOfTask[]): void;
    getScheduleGroup(): EnteredValuesOfSchedule[];
    setScheduleGroup(_param: EnteredValuesOfSchedule | EnteredValuesOfSchedule[]): void;
}

export interface View {
    rendering(): void;
}

export interface Controller {
    taskClickEvent(): void;
    scheduleClickEvent(): void;
    delClickEvent(_localstorageKey: string, _index?: number): void;
    doneClickEvent(): void;
    passClickEvent(): void;
    signInClickEvent(): void;
    signOutClickEvent(): void;
}

export interface Authorization {
    writeCookie(): void;
    deleteCookie(): void;
}