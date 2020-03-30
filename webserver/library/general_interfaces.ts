export interface OfficeInformationProps {
    officeId: string;
    nameId: string;
    name: string;
    mail: string;
    status: string;
    topView: CustomObject
    bottomView: CustomObject
}

export interface CustomObject {
    viewType: string;
    data: string;
}

export interface OfficeAvailabilityProps {
    nameId: string;
    status: string;
}