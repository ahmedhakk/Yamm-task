export interface IOrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

export interface IOrder {
  id: string
  reason: string
  amount: number
  store_name: string
  store_logo: string
  store_url: string
  is_active: boolean
  decision: string | null
  items: IOrderItem[]
}
