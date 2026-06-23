export interface NaturalPerson {
    dni: string;
    name: string;
    surname1: string;
    surname2: string;
    legalStreetType: string;
    legalStreetName: string;
    legalNumber: string;
    legalCity: string;
    postalCodeLegal?: string;
    notificationStreetType: string;
    notificationStreetName: string;
    notificationNumber: string;
    notificationCity: string;
    postalCodeNotification?: string;
    email: string;
    bank_account: string;
    phone: string;
}

export interface ArtificialPerson {
    dni: string;
    name: string;
    surname1: string;
    surname2: string;
    cif: string;
    companyName: string;
    legalStreetType: string;
    legalStreetName: string;
    legalNumber: string;
    legalCity: string;
    postalCodeLegal?: string;
    notificationStreetType: string;
    notificationStreetName: string;
    notificationNumber: string;
    notificationCity: string;
    postalCodeNotification?: string;
    email: string;
    phone: string;
    bank_account: string;
}
