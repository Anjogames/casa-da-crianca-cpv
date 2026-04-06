import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './services/privateRoute.jsx'
import Login from './pages/public/Login'
import Home from './pages/public/Home'
import Dashboard from './pages/admin/Home'
import AdminInformacoes from './pages/admin/AdminInformacoes'
import AdminPost from './pages/admin/AdminPost'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Publico */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Administrador */}
        <Route path="/admin" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
        <Route path="/admin/informacoes" element={<PrivateRoute> <AdminInformacoes /> </PrivateRoute>} />
        <Route path="/admin/posts" element={<PrivateRoute> <AdminPost /> </PrivateRoute>} />


      </Routes>
    </BrowserRouter>
  )
}

export default App