import {API_URL} from '../api';

/** resourceLink
 * @description Ссылка на ресурсы с бэка
 * @param {string} path
 * @return {string}
 */
export function resourceLink(path : string) {
  return API_URL + '/resources/' + path;
}
