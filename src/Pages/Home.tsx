import { DataTable, YaDataTable } from '@/DataTable'
import {
  OrderActions,
  OrderActiveStatus,
  OrderStoreName,
  Sidebar
} from '@/components'
import { IOrder } from '@/types'
import { numberFormatter } from '@/utils'

export function Home() {
  const dataTableOptions: DataTable.IProps<IOrder> = {
    columns: [
      {
        key: 'id',
        title: 'ID'
      },
      {
        key: 'amount',
        title: 'Amount',
        formatter: ({ item }) => numberFormatter(item.amount)
      },
      {
        key: 'reason',
        title: 'Reason'
      },
      {
        key: 'decision',
        title: 'Decision'
      },
      {
        key: 'store',
        title: 'Store',
        formatter: ({ item }) => <OrderStoreName {...item} />
      },
      {
        key: 'active',
        title: 'Active',
        formatter: ({ item }) => <OrderActiveStatus {...item} />
      },
      {
        key: 'items',
        title: 'Items',
        formatter: ({ item }) => item.items.length
      },
      {
        key: 'actions',
        title: 'Items',
        formatter: ({ item, updateItem }) => (
          <OrderActions order={item} updateItem={updateItem} />
        )
      }
    ],
    request: {
      url: '/orders'
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-4">
        <YaDataTable {...dataTableOptions} />
      </div>
    </div>
  )
}
