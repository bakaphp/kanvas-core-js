export interface ReceiverContactInput {
    value: string;
    contacts_types_id: number;
    weight: number;
}

export interface ReceiverAddressInput {
    address: string;
    city: string;
}

export interface ReceiverCustomFieldInput {
    name: string;
    data: any;
}

export interface ReceiverPeopleInput {
    firstname: string;
    lastname: string;
    contacts?: ReceiverContactInput[];
    address?: ReceiverAddressInput[];
    custom_fields?: ReceiverCustomFieldInput[];
}

export interface ReceiverOrganizationInput {
    name: string;
}

export interface ReceiverFileInput {
    name: string;
    url: string;
}

export interface ReceiverDataInput {
    title: string;
    pipeline_stage_id: number;
    people: ReceiverPeopleInput;
    organization?: ReceiverOrganizationInput;
    custom_fields?: ReceiverCustomFieldInput[];
    files?: ReceiverFileInput[];
}

export interface ReceiverResponse {
    success: boolean;
    message?: string;
    data?: any;
}
