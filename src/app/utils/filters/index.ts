// @ts-ignore
import moment from 'moment-jalaali';

export function filterAmount(date: number) {
  return new Intl.NumberFormat().format(date);
}
export function filterDateToPersian(date: string) {
  return moment(date).format('jYYYY/jMM/jDD');
}
export function filterDateToOptionalFormat(date: string, format: string) {
  return moment(date).format(format);
}
