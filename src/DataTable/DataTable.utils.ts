import { DataTable } from './DataTable.interface'

export const getFormattedColumn = <T>(
  item: T,
  column: DataTable.IColumn<T>,
  updateItem: DataTable.UpdateItem<T>
): DataTable.FormattedValue => {
  let value: DataTable.FormattedValue

  if (column.formatter && typeof column.formatter === 'function') {
    value = column.formatter({ item, updateItem })
  } else {
    value = item[column.key as keyof typeof item] as DataTable.FormattedValue
  }

  return value ?? '—'
}
