import { useEffect, useState} from 'react';
import AdminLayout from '../../components/AdminLayout';
import './admin.css';
import { supabase } from '../../lib/supabaseClient';


function Doacoes() {
    const [refeicoes, setRefeicoes] = useState({
        id: '',
        cafe_manha: '',
        almoco: '',
        lanche_tarde: '', 
        data: ''
    })

    const [doacoes, setDoacoes] = useState([
        {
            id: '',
            item: '',
            ativo: true
        }
    ])

    useEffect(() => {
        carregarDados()
    }, [])

    async function carregarDados() {
        const { data:refeicao, error:refeicaoError } = await supabase
            .from('refeicoes')
            .select('*')
            .single()
        
        const {data: doacao, error: doacaoError } = await supabase
            .from('doacoes')
            .select('*').order('item', {ascending: true})


        if (refeicaoError) {
            alert('Erro ao carregar dados de refeições:', refeicaoError)
        }
        else if (doacaoError) {
            alert('Erro ao carregar dados de doações:', doacaoError)
        }
        else {             
            setRefeicoes(refeicao)
            setDoacoes(doacao)
        }
    }

      function handleChange(e) {
        const { name, value } = e.target
        setRefeicoes(prev => ({ ...prev, [name]: value }))
    }

    async function salvarDados(e) {
        e.preventDefault()

        const { data, error } = await supabase
            .from('refeicoes')
            .update({
                cafe_manha: refeicoes.cafe_manha,
                almoco: refeicoes.almoco,
                lanche_tarde: refeicoes.lanche_tarde,
                data: new Date()
            })
            .eq('id', refeicoes.id)

        if (error) {
            alert('Erro ao salvar dados de doações:', error)
        } else {
            alert('Dados de doações salvos com sucesso!')
        }
    }

    const [item, setItem] = useState('')
    async function adicionarDoacao(e) {
        e.preventDefault()

        if (!item.trim()) {
            alert('Por favor, digite um item para doação.')
            return
        }

        const { data, error } = await supabase
            .from('doacoes')
            .insert({ item, ativo: true })
            .select().order('item', { ascending: true })
        
        if (error) {
            alert('Erro ao adicionar doação:', error)
        } else {
            alert('Doação adicionada com sucesso!')
            setDoacoes(prev => [...prev, data[0]])
            setItem('')
        }
    }

    async function excluirDoacao(id) {
        if(!window.confirm('Tem certeza que deseja excluir esta doação?')) {
            return
        }

        const { error } = await supabase
            .from('doacoes')
            .delete()
            .eq('id', id)

        if (error) {
            alert('Erro ao excluir doação: ', error)
        } else {
            alert('Doação excluída com sucesso!')
            setDoacoes(prev => prev.filter(doacao => doacao.id !== id))
        }
    }

    return (
        <AdminLayout>
            <div className="container">
                <h2>Dados Diarios</h2>
                <form className="container-form" onSubmit={salvarDados}>
                    <div className="form-group">
                        <label htmlFor="cafe">Café da Manhã Oferecidos:</label>
                        <input type="text" name="cafe_manha" value={refeicoes.cafe_manha} placeholder="Digite a quantidade de café da manhã odericidos por dia" onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="almoco">Almoço Oferecidos:</label>
                        <input type="text" name="almoco" value={refeicoes.almoco} placeholder="Digite a quantidade de almoço odericidos por dia" onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lanche">Lanche da Tarde Oferecidos:</label>
                        <input type="text" name="lanche_tarde" value={refeicoes.lanche_tarde} placeholder="Digite a quantidade de lanche da tarde odericidos por dia" onChange={handleChange}/>
                    </div>
                    <p>Alterado pela ultima vez: {refeicoes.data ? new Date(refeicoes.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : '---'} </p>

                    <button type="submit" className="btn-salvar">Salvar</button>

                </form>
            </div>  
            <div className="container">
                <h2>Doações que Precisamos</h2>

                <form className="container-form" onSubmit={adicionarDoacao}>
                    <div>
                        <input type="text" value={item} onChange={(e) => setItem(e.target.value)} placeholder="Digite o item que necessita de doação" />
                        <button type='submit' className="btn-salvar">Adicionar</button>
                    </div>
                </form>
                
                {doacoes.length > 0 ? (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {doacoes.map((doacao) => (
                                    <tr key={doacao.id}>
                                        <td>{doacao.item}</td>
                                        <td><button onClick={() => excluirDoacao(doacao.id)}>Excluir</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>Nenhuma doação registrada</p>
                )}
            </div>
        </AdminLayout>
    )
}

export default Doacoes