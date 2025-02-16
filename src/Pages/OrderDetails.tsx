import { api } from '@/api'
import { Spinner } from '@/components'
import { IOrder } from '@/types'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export function OrderDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState<IOrder | null>(null)

  useEffect(() => {
    const fetchingOrder = async () => {
      try {
        const { data } = await api.get<IOrder>(`orders/${id}`)
        setOrder(data)
      } catch (error) {
        console.error('Error fetching order:', error)
      }
    }

    fetchingOrder()
  }, [id])

  if (!order) return <Spinner />

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10 border border-gray-200 relative">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition"
      >
        ← Back to Home
      </button>

      {/* Store Information */}
      <div className="flex items-center space-x-4 border-b pb-4 mt-15">
        <img
          src={order.store_logo}
          alt={order.store_name}
          className="w-16 h-16 rounded-lg shadow-sm border border-gray-300"
        />
        <div>
          <h2 className="text-xl font-semibold">{order.store_name}</h2>
          <a
            href={order.store_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            Visit Store →
          </a>
        </div>
      </div>

      {/* Order Details */}
      <div className="mt-6 space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">
          🔹 Order Details
        </h3>
        <p className="text-gray-600">
          <strong>Order ID:</strong> {order.id}
        </p>
        <p className="text-gray-600">
          <strong>Reason:</strong> {order.reason}
        </p>
        <p className="text-gray-600">
          <strong>Amount:</strong>{' '}
          <span className="font-bold text-green-600">${order.amount}</span>
        </p>
        <p className="text-gray-600">
          <strong>Decision:</strong> {order.decision}
        </p>
        <p
          className={`text-sm font-semibold ${
            order.is_active ? 'text-green-600' : 'text-red-600'
          }`}
        >
          <strong>Status:</strong>{' '}
          {order.is_active ? '✅ Active' : '❌ Inactive'}
        </p>
      </div>

      {/* Order Items */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">🛍️ Order Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded-lg shadow-sm bg-gray-50"
            >
              <p className="text-gray-800 font-medium">📌 {item.name}</p>
              <p className="text-gray-600">
                💰 <strong>${item.price}</strong>
              </p>
              <p className="text-gray-600">🔢 Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
