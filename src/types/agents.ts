import { PaginatorInfo } from './paginator';

interface User {
  displayname?: string;
  create_at?: string;
  contacts?: {
    phone_number: string;
    cell_phone_number: string;
  };
}

export interface Agent {
  member_id: number;
  name: string;
  status_id?: number;
  total_leads?: number;
  user?: User;
}

export interface AgentsData {
  agents: { data: AgentsData[]; paginatorInfo?: PaginatorInfo };
}
