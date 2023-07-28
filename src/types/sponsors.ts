/* eslint-disable @typescript-eslint/no-explicit-any */
// import { File } from 'types/file.interface';
// import { Location } from 'types/location.interface';
// import { RoleInterface } from './role.interface';

export interface CreateSponsorParams {
    email: string;
    firstname: string;
    lastname: string;
    role_id: number;
    company_branches_id: number;
}

export interface SponsorData {
    id: number;
    email: string;
    invite_hash: string;
}
