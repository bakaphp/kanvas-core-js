import { PaginatorInfo } from "./paginator";

interface User {
  displayname?: string;
  create_at?: string;
  contacts?: {
    phone_number: string;
    cell_phone_number: string;
  };
}

export interface Owner {
  firstname: string;
  lastname: string;
  email: string;
  contact: {
    phone_number: string;
  };
}

export interface Agent {
  member_id: number;
  name: string;
  status?: { name: string };
  total_leads?: number;
  user?: User;
  owner?: Owner;
}

export interface AgentsData {
  agents: { data: Agent[]; paginatorInfo?: PaginatorInfo };
}
