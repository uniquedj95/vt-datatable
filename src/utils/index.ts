import { SortQuery, TableRow } from "@/interfaces";
import { TableColumn } from '../interfaces/index';

export function getValue (object: Record<string, any>, path: string, defaultValue?: any) {
  if (object === null || typeof object !== 'object' || !path) return defaultValue;
  let value = object;
  for (let key of path.split('.') as Array<any>) {
    if(Array.isArray(value) && !isNaN(parseInt(key))) key = parseInt(key)
    if(value.hasOwnProperty(key)) value = value[key]
    else return defaultValue;
  }
  return value
}

export function getSortValue(column: TableColumn, row: TableRow) {
  let value = typeof column.value === 'function' ? column.value(row) : getValue(row, column.value, "")
  if (typeof column.preSort === "function") value = column.preSort(value);
  if (typeof value === "number" || column.sortCaseSensitive) return value
  return value.toString().toLowerCase();
}

export function sortRows (rows: Array<TableRow>, sortQuery: SortQuery) {
  return rows.sort((row1, row2) => {
    const x = getSortValue(sortQuery.column, row1);
    const y = getSortValue(sortQuery.column, row2);
    if(sortQuery.order === 'asc') return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
  })
}