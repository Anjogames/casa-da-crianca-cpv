import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        setUser(data.user)
      }
      setLoading(false)
    }
    checkUser()
  }, [])

  if (loading) return <div>Carregando...</div>

  // se não estiver logado, redireciona para login
  if (!user) return <Navigate to="/login" replace />

  return children
}