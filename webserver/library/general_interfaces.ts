export interface UserInformation {
    officeId: string;
    nameId: string;
    name: string;
    mail: string;
    status: string;
    calenderURL: string;
    viewType: string;
    firstView: ViewData;
    secondView: ViewData;
    thirdView: ViewData;
    fourthView: ViewData;
    customView: ViewData;
}

export interface ViewData {
    dataType: string;
    data: string;
}

export interface OfficeAvailabilityProps {
    nameId: string;
    status: string;
}