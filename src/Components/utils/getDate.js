export function getDate(value) {
  const date = new Date(value).toISOString();
  const year = date.substr(0, 4);
  const monts = date.substr(5, 2);
  const day = date.substr(8, 2);
  const hours = date.substr(11, 5);

  const fullDate = `${hours} ${day}.${monts}.${year}`;
  return fullDate;
}
