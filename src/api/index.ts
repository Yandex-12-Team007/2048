import fetch from 'node-fetch';

const API_URL = 'https://ya-praktikum.tech/api/v2';

class ApiModule {
  private baseUrl: string;

  constructor(url = API_URL) {
    this.baseUrl = url;
  }

  public get = (url: string) => this.request('GET', url);

  public post = (url: string, data) => this.request('POST', url, data);

  public delete = (url: string, data) => this.request('DELETE', url, data);

  public put = (url: string, data) => this.request('PUT', url, data);

  private request(
      method: string,
      url: string,
      data = null,
      headers?: HeadersInit,
  ) {
    const requestInit: RequestInit = {
      method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (method === 'POST' || method === 'PUT') {
      requestInit.body = JSON.stringify(data);
    }

    return fetch(`${this.baseUrl}${url}`, requestInit)
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            throw new Error(`Error! Status code: ${response.status}`)
          }
        });
  }
}

const apiModule = new ApiModule();

export {API_URL, ApiModule};

export default apiModule;
