import axios, { CreateAxiosDefaults } from "axios";

export const CreateAxiosClient = <T extends any = any>(
  config?: CreateAxiosDefaults<T> | undefined,
) => axios.create(config);
