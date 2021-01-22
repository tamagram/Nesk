type EnteredValuesOfTask = {
    taskName: string;
    taskDetails: string;
}
type EnteredValuesOfSchedule = {
    scheduleName: string;
    scheduleDetails: string;
    yyyymmdd: string;
    hhmm: string;
}
export interface ElementRegister {
    readonly input?: EnteredValuesOfTask | EnteredValuesOfSchedule;
    //連想配列
    group?: EnteredValuesOfTask[] | EnteredValuesOfSchedule[];
    formReading(): void;
    intoGroup(): void;
}

export interface GroupManager {
    managedGroup: EnteredValuesOfTask[] | EnteredValuesOfSchedule[];
    groupSort(): EnteredValuesOfTask[] | EnteredValuesOfSchedule[];
}

export interface Render {
    topRenderGroup: HTMLDivElement[];
    renderGroup: HTMLLIElement[];
    groupAlteredForTop(): HTMLDivElement[];
    groupAlter(): HTMLLIElement[];
    topRender(): void;
    groupRender(): void;
}

export interface Updating {
    yyyymmdd: string;
    hhmm: string;
    updatingGroup: EnteredValuesOfTask[] | EnteredValuesOfSchedule[];
    minutesUpdate(): void;
    localStorageUpdate(): void;
    groupObservation(): void;
}