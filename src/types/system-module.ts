import { AppUserInterface } from './app';

export interface SystemModuleInterface {
  id: string;
  uuid: string;
  name: string;
  slug: string;
  model_name: string;
  app: AppUserInterface;
  parent: SystemModuleInterface;
  menu_order: number;
  show: number;
}
export interface Where {
  column: string;
  operator: string;
  value: string;
  and: [Where];
  or: [Where];
}
