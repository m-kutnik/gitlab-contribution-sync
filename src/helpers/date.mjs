export const getYMD = dateToParse => {
  const date = new Date(dateToParse).toISOString()
  return date.split('T')[0]
}
