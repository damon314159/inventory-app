const camelToSnake = (camelStr: string): string =>
  camelStr.replace(
    /([a-z])([A-Z])/g,
    (_, lower, upper): string => `${lower}_${upper.toLowerCase()}`
  )

const snakeToCamel = (snakeStr: string): string =>
  snakeStr.replace(
    /([a-z])_([a-z])/g,
    (_, first, second): string => `${first}${second.toUpperCase()}`
  )

export { camelToSnake, snakeToCamel }
