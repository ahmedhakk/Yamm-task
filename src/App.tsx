import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, OrderDetails } from '@/Pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order/:id" element={<OrderDetails />} />
      </Routes>
    </Router>
  )
}

export default App
