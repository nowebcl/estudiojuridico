// Supabase Configuration
const supabaseUrl = 'https://rfirnsgpbajpgdrhfrqo.supabase.co';
const supabaseKey = 'sb_publishable_Uib4gcKLF30_QJtUvsIhjw_dLPJeT8B'; // Reemplazar con tu Anon Key de Supabase

// Crear cliente global de Supabase
// La librería CDN expone el objeto global 'supabase'
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
