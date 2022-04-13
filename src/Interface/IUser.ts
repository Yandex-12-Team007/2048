export default interface IUser {
  id : number,
  avatar : string | undefined,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
  password? : string
}
