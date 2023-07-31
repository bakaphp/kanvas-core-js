/* eslint-disable @typescript-eslint/no-explicit-any */
// import { File } from 'types/file.interface';
// import { Location } from 'types/location.interface';
// import { RoleInterface } from './role.interface';


interface CustomFieldInput {
    name: string;
    data: any;
}

export interface InviteSponsorParams {
    email: string;
    firstname: string;
    lastname: string;
    role_id: number;
    company_branches_id: number;
    //description: string;
    //email_template: string;
    custom_fields: CustomFieldInput[]
}

export interface InviteSponsorData {
    id: number;
    email: string;
    invite_hash: string;
}
