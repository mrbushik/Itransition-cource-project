export const filter = (theme) => ({
  type: 'CHANGE_FILTER',
  payload: theme,
});
export const filterValue = (theme) => ({
  type: 'CHANGE_FILTER_VALUE',
  payload: theme,
});
