export function routeReplace(
    route: string,
    key: string,
    value: string
): string {
  /** TODO: В идеале побольше проверок */
  return route.replace(':' + key, value);
}

export function routeListReplace(
    route: string,
    keys: string[],
    values: string[]
): string {
  /** TODO: В идеале побольше проверок */
  if (keys.length !== values.length) {
    throw new Error('Массив ключей не совпадает с массивом значений');
  }

  keys.forEach((key, id) => {
    const value = values[id];
    route = routeReplace(route, key, value);
  })

  return route;
}
