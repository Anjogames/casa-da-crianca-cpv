import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate, NavLink } from 'react-router-dom'

import { FaHome, FaNewspaper, FaHandHoldingHeart, FaSignOutAlt } from 'react-icons/fa'

import './adminLayout.css'

function AdminLayout({ children }) {
  const [nome, setNome] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    carregarUsuario()
  }, [])

  async function carregarUsuario() {
    const { data } = await supabase.auth.getUser()

    if (data.user) {
      setNome(data.user.user_metadata?.nome || data.user.email)
    }
  }

  async function sair() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div className="layout">

      {/* HEADER */}
      <header className="header">

        <div className="header-left">
          <h2
          >Casa da Criança</h2>
          <span className="boas-vindas">Olá, {nome}</span>
        </div>

        <div className="header-right">
          <button onClick={sair}><FaSignOutAlt /> Sair </button>
        </div>
      </header>

      {/* MENU CENTRALIZADO */}
      <nav className="menu">

        <NavLink to="/admin" end className="link"> <FaHome /> Home </NavLink>
        <NavLink to="/admin/posts" className="link"><FaNewspaper /> Posts </NavLink>
        <NavLink to="/admin/informacoes" className="link"><FaHandHoldingHeart /> Informações </NavLink>
        
      </nav>

      {/* CONTEÚDO */}
      <main className="conteudo">
        {children}
      </main>
    </div>
  )
}

export default AdminLayout