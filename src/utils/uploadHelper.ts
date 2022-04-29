import {API_URL} from '../api';

/** resourseLink
 * @description Ссылка на ресурсы с бэка
 * @param {string} path
 * @return {string}
 */
export function resourseLink(path : string) {
  return API_URL + '/resources/' + path;
}
