
/* VENZUNO — Autenticação Supabase */

const VENZUNO_SUPABASE_URL =
  "https://iutgxxynxkedvnotovqa.supabase.co";

const VENZUNO_SUPABASE_KEY =
  "sb_publishable_0WNP9RPw4ZIA1dQVWOd4-g_1nQzCDcr";

const venzunoAuth = window.supabase.createClient(
  VENZUNO_SUPABASE_URL,
  VENZUNO_SUPABASE_KEY
);

async function cadastrarUsuario(nome, email, senha) {
  const { data, error } = await venzunoAuth.auth.signUp({
    email,
    password: senha,
    options: {
      data: { full_name: nome },
      emailRedirectTo: window.location.origin
    }
  });

  if (error) throw error;
  return data;
}

async function entrarUsuario(email, senha) {
  const { data, error } =
    await venzunoAuth.auth.signInWithPassword({
      email,
      password: senha
    });

  if (error) throw error;
  return data;
}

async function sairUsuario() {
  const { error } = await venzunoAuth.auth.signOut();
  if (error) throw error;
}

async function usuarioAtual() {
  const { data, error } = await venzunoAuth.auth.getUser();
  if (error) return null;
  return data.user;
}
