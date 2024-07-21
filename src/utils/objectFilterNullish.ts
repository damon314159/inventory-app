const filterNullish = (obj: Record<string, unknown>): Partial<typeof obj> => {
  const newObj: Partial<typeof obj> = {}
  Object.entries(obj).forEach(([key, val]): void => {
    if (val !== undefined && val !== null) {
      newObj[key] = val
    }
  })
  return newObj
}

export default filterNullish
