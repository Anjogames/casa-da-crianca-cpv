import { supabase } from '../lib/supabaseClient'

export async function login(email, senha) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha
  })

  return { data, error }
}

export async function logout() {
  await supabase.auth.signOut()
}

export async function getUser() {
  const { data } = await supabase.auth.getUser()
  return data.user
}