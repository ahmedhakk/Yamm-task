import { ReactElement } from 'react'
import { IOrder } from '@/types'

export const OrderStoreName = (order: IOrder): ReactElement<IOrder> => {
  return (
    <>
      <a
        href={order.store_url}
        target="_blank"
        className="flex gap-x-2 items-center text-blue-700"
      >
        <img
          src={order.store_logo}
          width={32}
          height={32}
          className="rounded-full"
        />

        <span>{order.store_name}</span>
      </a>
    </>
  )
}
