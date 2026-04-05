import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

function Home() {
  const [posts, setPosts] = useState([])
  const [imagens, setImagens] = useState([])

  useEffect(() => {
    buscarDados()
  }, [])

  async function buscarDados() {
    const { data: postsData, error: errorPosts } = await supabase
      .from('posts')
      .select('*')

    const { data: imagensData, error: errorImagens } = await supabase
      .from('post_imagens')
      .select('*')

    if (errorPosts) console.log(errorPosts)
    if (errorImagens) console.log(errorImagens)

    setPosts(postsData || [])
    setImagens(imagensData || [])
  }

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