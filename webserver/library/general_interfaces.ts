export interface UserInformation {
    office: string;
    nameId: string;
    name: string;
    mail: string;
    status: { text: string, color: string };
    calendarURL: string;
    viewType: string;
    firstView: ViewData;
    secondView: ViewData;
    thirdView: ViewData;
    fourthView: ViewData;
    customView: ViewData;
    statusButtons: any[];
}

export interface ViewData {
    dataType: string;
    data: string;
}

export interface OfficeAvailabilityProps {
    nameId: string;
    status: { text: string, color: string };
    calendarURL: string;
    small?: boolean;
}