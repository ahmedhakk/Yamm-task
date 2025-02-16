import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-violet-400 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Yamm Dashboard</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <Link to="/" className="block p-2 hover:bg-violet-500 rounded">
              Refund Orders
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
