import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import Loading from '../../services/Loading'

function Home() {
  const [posts, setPosts] = useState([])
  const [imagens, setImagens] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    buscarDados()
  }, [])

  async function buscarDados() {
    try {
      const { data: postsData, error: errorPosts } = await supabase
        .from('posts')
        .select('*')

      const { data: imagensData, error: errorImagens } = await supabase
        .from('post_imagens')
        .select('*')

        if (errorPosts) alert(errorPosts)
        if (errorImagens) alert(errorImagens)

        setPosts(postsData || [])
        setImagens(imagensData || [])

    } catch (error) {
      if(loading) return <Loading />
      if (error) return <h1>{error}</h1>
    } finally {
      setLoading(false)
    }
}

    if(loading) return <Loading />
    if (error) return <h1>{error}</h1>

  return (
    <div>
      <h1>Posts</h1>

      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.titulo}</h2>
          <p>{post.conteudo}</p>

          {imagens
            .filter(img => img.post_id === post.id)
            .map(img => (
              <img 
                key={img.id}
                src={img.imagem_url}
                width="200"
              />
            ))}
        </div>
      ))}
    </div>
  )
}

export default Home