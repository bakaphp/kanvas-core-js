import { ClientType } from '../../index';

export abstract class Base {
  constructor(protected client: ClientType) {}
}