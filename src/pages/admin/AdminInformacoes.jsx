import { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import './admin.css'
import { supabase } from '../../lib/supabaseClient'


function AdminInformacoes() {
  function validarCampos() {
    if (
      !contato.telefone ||
      !contato.email ||
      !contato.endereco ||
      !contato.facebook ||
      !contato.instagram ||
      !contato.cnpj ||
      !contato.banco ||
      !contato.agencia ||
      !contato.conta
    ) {
      alert('Preencha todos os campos obrigatórios!')
      return false
    }
    return true
  }

  const [contato, setContato] = useState({
    telefone: '',
    email: '',
    endereco: '',
    facebook: '',
    instagram: '',
    cnpj: '',
    banco: '',
    agencia: '',
    conta: '',
    pix: ''
  })

  useEffect(() => {
    carregarDados()
  }, [])

  async function carregarDados() {
    const { data, error } = await supabase
      .from('contato')
      .select('*')
      .single()

    if (error) {
      console.error('Erro ao carregar dados de contato:', error)
    } else {
      setContato(data)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setContato(prev => ({ ...prev, [name]: value }))
  } 

  async function salvarDados(e) {
    e.preventDefault()

    if (!validarCampos()) return

    const { error } = await supabase
      .from('contato')
      .update({
        telefone: contato.telefone,
        email: contato.email,
        endereco: contato.endereco,
        facebook: contato.facebook,
        instagram: contato.instagram,
        cnpj: contato.cnpj,
        banco: contato.banco,
        agencia: contato.agencia,
        conta: contato.conta,
        pix: contato.pix
      })
      .eq('id', contato.id) // MUITO IMPORTANTE

    if (error) {
      console.error(error)
      alert('Erro ao salvar!')
    } else {
      alert('Dados atualizados com sucesso!')
    }
  }

  return (
    <AdminLayout>
      <div className="container">
      <h2>Dados em Gerais</h2>

      <form className="container-form" onSubmit={salvarDados}>

        <div className="form-group">
        <label>Telefone</label>
        <input type="text" name="telefone" value={contato.telefone} placeholder="Digite o telefone" onChange={handleChange}/>
        </div>

        <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={contato.email} placeholder="Digite o email" onChange={handleChange} />
        </div>

        <div className="form-group">
        <label>Endereço</label>
        <input type="text" name="endereco" value={contato.endereco} placeholder="Digite o endereço" onChange={handleChange} />
        </div>

        <div className="form-group">
        <label>Facebook</label>
        <input type="text" name="facebook" value={contato.facebook} placeholder="Link do Facebook" onChange={handleChange} />
        </div>

        <div className="form-group">
        <label>Instagram</label>
        <input type="text" name="instagram" value={contato.instagram} placeholder="Link do Instagram" onChange={handleChange} />
        </div>

        <div className="form-group">
        <label>CNPJ</label>
        <input type="text" name="cnpj" value={contato.cnpj} placeholder="Digite o CNPJ" onChange={handleChange} />
        </div>

        <div className="form-group">
        <label>Banco</label>
        <input type="text" name="banco" value={contato.banco} placeholder="Nome do banco" onChange={handleChange} />
        </div>

        <div className="form-group">
        <label>Agência</label>
        <input type="text" name="agencia" value={contato.agencia} placeholder="Número da agência" onChange={handleChange} />
        </div>

        <div className="form-group">
        <label>Conta</label>
        <input type="text" name="conta" value={contato.conta} placeholder="Número da conta" onChange={handleChange} />
        </div>

        <div className="form-group">
        <label>PIX</label>
        <input type="text" name="pix" value={contato.pix} placeholder="Chave PIX" onChange={handleChange} />
        </div>

        <button type="submit" className="btn-salvar">Salvar</button>

      </form>
      </div>
    </AdminLayout>
  )
}

export default AdminInformacoes