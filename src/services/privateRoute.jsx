import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import Loading from './Loading'

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // função para pegar usuário atual
    async function getUser() {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        console.error('Erro ao buscar usuário:', error)
      }

      setUser(data?.user ?? null)
      setLoading(false)
    }

    getUser()

    // listener para mudanças de login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    // cleanup (boa prática)
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  if (loading) return <Loading />

  if (!user) {
    return <Navigate to="/logar" replace />
  }

  return children
}