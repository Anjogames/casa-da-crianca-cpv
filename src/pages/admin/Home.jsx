import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

function Dashboard() {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')

  useEffect(() => {
    carregarUsuario()
  }, [])

  async function carregarUsuario() {
    // pega usuário logado
    const { data } = await supabase.auth.getUser()

    const user = data.user

    // busca nome na tabela
    const { data: perfil } = await supabase
      .from('usuarios')
      .select('nome')
      .eq('id', user.id)
      .single()

    if (perfil) {
      setNome(perfil.nome)
    }
  }

  async function sair() {
    await supabase.auth.signOut() // desloga o usuário
    navigate('/')            // redireciona para a página de login
  }

  return (
    <div>
      <h1>Painel Admin</h1>
      <h2>Bem-vindo, {nome}!</h2>

      <button onClick={sair}>Sair</button>
    </div>
  )
}

export default Dashboard