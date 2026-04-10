import { useEffect, useState} from 'react';
import AdminLayout from '../../components/AdminLayout';
import './admin.css';
import { supabase } from '../../lib/supabaseClient';


function Doacoes() {
    const [doacoes, setDoacoes] = useState({
        id: '',
        cafe_manha: '',
        almoco: '',
        lanche_tarde: '', 
        data: ''
    })

    useEffect(() => {
        carregarDados()
    }, [])

    async function carregarDados() {
        const { data, error } = await supabase
            .from('refeicoes')
            .select('*')
            .single()

        if (error) {
            console.error('Erro ao carregar dados de doações:', error)
        }
        else {             
            setDoacoes(data)
        }
    }

      function handleChange(e) {
        const { name, value } = e.target
        setDoacoes(prev => ({ ...prev, [name]: value }))
    }

    async function salvarDados(e) {
        e.preventDefault()

        const { data, error } = await supabase
            .from('refeicoes')
            .update({
                cafe_manha: doacoes.cafe_manha,
                almoco: doacoes.almoco,
                lanche_tarde: doacoes.lanche_tarde,
                data: new Date()
            })
            .eq('id', doacoes.id)

        if (error) {
            alert('Erro ao salvar dados de doações:', error)
        } else {
            alert('Dados de doações salvos com sucesso!')
        }
    }


    return (
        <AdminLayout>
            <div className="container">
                <h2>Dados Diarios</h2>
                <form className="container-form" onSubmit={salvarDados}>
                    <div className="form-group">
                        <label htmlFor="cafe">Café da Manhã Oferecidos:</label>
                        <input type="text" name="cafe_manha" value={doacoes.cafe_manha} placeholder="Digite a quantidade de café da manhã odericidos por dia" onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="almoco">Almoço Oferecidos:</label>
                        <input type="text" name="almoco" value={doacoes.almoco} placeholder="Digite a quantidade de almoço odericidos por dia" onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lanche">Lanche da Tarde Oferecidos:</label>
                        <input type="text" name="lanche_tarde" value={doacoes.lanche_tarde} placeholder="Digite a quantidade de lanche da tarde odericidos por dia" onChange={handleChange}/>
                    </div>
                    <p>Alterado pela ultima vez: {doacoes.data ? new Date(doacoes.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : '---'} </p>

                    <button type="submit" className="btn-salvar">Salvar</button>

                </form>
            </div>  
            <div className="container">
                <h1>Admin Doações</h1>
            </div>
        </AdminLayout>
    )
}

export default Doacoes