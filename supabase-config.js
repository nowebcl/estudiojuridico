// Supabase Configuration
const supabaseUrl = 'https://rfirnsgpbajpgdrhfrqo.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'; // Reemplazar con tu Anon Key de Supabase

// Crear cliente global de Supabase
// La librería CDN expone el objeto global 'supabase'
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
