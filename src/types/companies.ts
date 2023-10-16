import {UserInterface} from 'index'

export interface CompanyInterface {
    id: string;
    name: string;
    uuid: string;
    website: string;
    address: string;
    zipcode: number;
    email: string;
    language: string;
    timezone: string;
    phone: string;
    user: UserInterface;
    country_code: string;
    created_at: string;
    updated_at: string;
}