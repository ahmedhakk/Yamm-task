import { AxiosRequestConfig } from 'axios'
import { JSX } from 'react'

export namespace DataTable {
  export type UpdateItem<T> = (value: Partial<T>) => void

  export interface IColumnFormatterProps<T> {
    item: T
    updateItem: UpdateItem<T>
  }

  export type FormattedValue = string | number | JSX.Element | null

  export interface IColumn<T> {
    title: string
    key: string
    formatter?: (
      props: IColumnFormatterProps<T>
    ) => FormattedValue | JSX.Element
  }

  export interface IProps<T> {
    columns: IColumn<T>[]
    request: AxiosRequestConfig
  }

  export interface IPaginatedResponse<T> {
    data: T[]
    first: number
    items: number
    last: number
    next: number
    pages: number
    prev: number
  }
}
