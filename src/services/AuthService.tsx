export default class AuthService {
  private API: string;
  private userInfo?: Object;

  constructor() {
    this.API = 'https://ya-praktikum.tech/api/v2';
    this.userInfo = undefined;
  }

  async getUserInfo() {
    // store userInfo to redux?
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: "cors" as "cors",
      credentials: "include" as "include",
    };
    try {
      const fetchResponse = await fetch(`${this.API}/auth/signup/`, settings);
      this.userInfo = await fetchResponse.json();
      return this.userInfo;
    } catch (e) {
      console.error(e) ;
    }
  }
}
