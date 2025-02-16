import { ReactElement, useState } from 'react'
import {
  mdiCheck,
  mdiClose,
  mdiEyeOutline,
  mdiRocketLaunchOutline,
  mdiToggleSwitchOffOutline,
  mdiToggleSwitchOutline
} from '@mdi/js'
import { IMenuItem, YaMenu } from '@/atoms'
import { api } from '@/api'
import { DataTable } from '@/DataTable'
import { IOrder } from '@/types'
import { useNavigate } from 'react-router-dom'

interface IProps {
  order: IOrder
  updateItem: DataTable.UpdateItem<IOrder>
}

export const OrderActions = ({
  order,
  updateItem
}: IProps): ReactElement<IOrder> => {
  const [showMenu, onShowMenu] = useState(false)

  const navigate = useNavigate()

  const changeOrderDecision = (decision: 'accept' | 'reject' | 'escalate') =>
    api
      .patch<IOrder>(`/orders/${order.id}`, {
        decision
      })
      .then(({ data }) =>
        updateItem({
          ...data
        })
      )
      .catch(() => {
        //
      })

  const menuItems: IMenuItem[] = [
    {
      title: 'Reject',
      icon: mdiClose,
      onClick: () => changeOrderDecision('reject')
    },
    {
      title: 'Accept',
      icon: mdiCheck,
      onClick: () => changeOrderDecision('accept')
    },
    {
      title: 'Escalate',
      icon: mdiRocketLaunchOutline,
      onClick: () => changeOrderDecision('escalate')
    },
    {
      title: order.is_active ? 'Deactivate Order' : 'Activate Order',
      icon: order.is_active
        ? mdiToggleSwitchOutline
        : mdiToggleSwitchOffOutline,
      onClick: () =>
        api
          .patch<IOrder>(`/orders/${order.id}`, {
            is_active: !order.is_active
          })
          .then(({ data }) =>
            updateItem({
              ...data
            })
          )
          .catch(() => {
            //
          })
    },
    {
      title: 'View details',
      icon: mdiEyeOutline,
      onClick: () => navigate(`/order/${order.id}`)
    }
  ]

  return (
    <>
      <YaMenu showMenu={showMenu} items={menuItems} onShowMenu={onShowMenu} />
    </>
  )
}
