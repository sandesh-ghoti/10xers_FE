export type errorMsgType = string | Array<string> | Error | null;
export interface IProduct {
  id?: number;
  brand: string;
  modelName: string;
  description: string;
  price: number;
  admin: number;
}
export interface IUser {
  id?: number;
  email: string;
  password: string;
  role?: string;
}
