export function getDate(value) {
  const userNowDate = new Date();

  const userTimeZoneValue = -userNowDate.getTimezoneOffset() / 60;
  const date = new Date(value).toISOString();
  const year = date.substr(0, 4);
  const monts = date.substr(5, 2);
  const day = date.substr(8, 2);
  const hours = +date.substr(11, 2) + +userTimeZoneValue;
  const minutes = date.substr(14, 2);
  const fullDate = `${String(hours)}:${minutes} ${day}.${monts}.${year}`;
  return fullDate;
}
