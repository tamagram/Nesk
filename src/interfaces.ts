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
    readonly getTaskGroup: EnteredValuesOfTask[];
    setTaskGroup: EnteredValuesOfTask | EnteredValuesOfTask[];
    readonly getScheduleGroup: EnteredValuesOfSchedule[];
    setScheduleGroup: EnteredValuesOfSchedule | EnteredValuesOfSchedule[];
}

export interface View {
    rendering(): void;
}

export interface Controller {
    taskClickEvent(): void;
    scheduleClickEvent(): void;
    delClickEvent(): void;
    doneClickEvent(): void;
    passClickEvent(): void;
}