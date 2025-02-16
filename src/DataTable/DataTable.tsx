import { ReactElement, useEffect, useState } from 'react'
import clsx from 'clsx'
import { DataTable } from './DataTable.interface'
import { getFormattedColumn } from './DataTable.utils'
import { api } from '@/api'

export const YaDataTable = <T,>({
  columns,
  request
}: DataTable.IProps<T>): ReactElement<DataTable.IProps<T>> => {
  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [items, setItems] = useState<T[]>([])

  const isNextDisabled = page >= totalPages
  const isPrevDisabled = page === 1

  const onClickNext = () => setPage(page + 1)
  const onClickPrev = () => setPage(page - 1)

  const onUpdateItem =
    (item: T, index: number): DataTable.UpdateItem<T> =>
    (value) => {
      const _items = [...items]

      _items[index] = {
        ...item,
        ...value
      }

      setItems(_items)
    }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await api<DataTable.IPaginatedResponse<T>>({
          ...request,
          params: {
            ...request.params,
            _page: page,
            _per_page: 15
          }
        })

        setItems(data.data)
        setTotalPages(data.pages)
        setTotalItems(data.items)
      } catch (e) {
        console.log('e', e)
      }
    }

    fetchItems()
  }, [request, page])

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="font-bold">Total Items: {totalItems}</div>

        <div className="flex gap-x-2 mb-3 justify-end">
          <button
            className={clsx(
              'flex items-center gap-x-2 px-4 py-2 text-sm rounded-md border border-gray-200 ',
              {
                ['text-gray-800 cursor-pointer hover:bg-gray-100']:
                  !isPrevDisabled,
                ['cursor-not-allowed text-gray-400']: isPrevDisabled
              }
            )}
            onClick={onClickPrev}
            disabled={isPrevDisabled}
          >
            Previous
          </button>

          <button
            className={clsx(
              'flex items-center gap-x-2 px-4 py-2 text-sm rounded-md border border-gray-200 ',
              {
                ['text-gray-800 cursor-pointer hover:bg-gray-100']:
                  !isNextDisabled,
                ['cursor-not-allowed text-gray-400']: isNextDisabled
              }
            )}
            onClick={onClickNext}
            disabled={isNextDisabled}
          >
            Next
          </button>
        </div>
      </div>

      <table className="w-full border-spacing-0">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="border-0 border-b border-b-gray-200 border-solid font-bold text-gray-500 text-start align-middle whitespace-nowrap h-11 select-none px-4"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className="py-1 px-4">
                  {getFormattedColumn(item, column, onUpdateItem(item, index))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
