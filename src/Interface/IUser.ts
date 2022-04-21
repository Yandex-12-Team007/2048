export default interface IUser {
  id : number,
  avatar : string | undefined,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  password? : string
}

export interface ILoginUserModel {
  login: string,
  password: string,
}

export interface IRegistrationUserModel {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  phone: string;
  password: string
}
