import { PaginatorInfo } from './paginator';

interface User {
  displayname?: string;
}

export interface Agent {
  member_id: number;
  name: string;
  created_at: string;
  user?: User;
  paginatorInfo?: PaginatorInfo;
}

export interface AgentsData { 
  agents: { data: AgentsData[] };
}
