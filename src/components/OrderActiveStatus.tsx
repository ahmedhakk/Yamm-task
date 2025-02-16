import { ReactElement } from 'react'
import { IOrder } from '@/types'
import Icon from '@mdi/react'
import { mdiCheckCircle } from '@mdi/js'
import clsx from 'clsx'

export const OrderActiveStatus = (order: IOrder): ReactElement<IOrder> => {
  return (
    <>
      <Icon
        path={mdiCheckCircle}
        size={0.8}
        className={clsx({
          ['text-green-600']: order.is_active,
          ['text-gray-400']: !order.is_active
        })}
      />
    </>
  )
}
