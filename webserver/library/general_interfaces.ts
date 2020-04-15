export interface UserInformation {
    officeId: string;
    nameId: string;
    name: string;
    mail: string;
    status: string;
    customView: TabletViewInformation;
}

export interface TabletViewInformation {
    viewType: string;
    firstView: ViewData;
    secondView: ViewData;
    thirdView: ViewData;
    fourthView: ViewData;
}

export interface ViewData {
    dataType: string;
    data: string;
}

export interface OfficeAvailabilityProps {
    nameId: string;
    status: string;
}