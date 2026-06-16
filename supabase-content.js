// Supabase Content Loader
document.addEventListener('DOMContentLoaded', () => {
  loadPageContent();
});

async function loadPageContent() {
  let filename = window.location.pathname.split('/').pop();
  if (!filename || filename === 'admin' || filename === 'admin/') {
    filename = 'index.html';
  }

  try {
    const { data, error } = await supabaseClient
      .from('site_pages')
      .select('content')
      .eq('filename', filename)
      .maybeSingle(); // maybeSingle doesn't throw an error if no row is found

    if (error) {
      console.warn('Supabase: Error al consultar contenido de la página:', error.message);
      return;
    }

    if (data && data.content) {
      applyPageContent(data.content);
    }
  } catch (err) {
    console.error('Supabase: Excepción al cargar contenido:', err);
  }
}

function applyPageContent(content) {
  for (const selector in content) {
    const value = content[selector];
    const elements = document.querySelectorAll(selector);

    elements.forEach(el => {
      // Avoid modifying editor toolbar if active
      if (el.closest('.admin-toolbar') || el.closest('.admin-modal')) return;

      if (el.tagName === 'IMG') {
        el.src = value;
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.value = value;
      } else {
        el.innerHTML = value;
      }
    });
  }
  
  // Re-trigger scroll reveal animations if active
  if (typeof revealElements !== 'undefined') {
    // If main.js loaded earlier, reveal elements might need recalculating,
    // but standard scroll intersection observer works dynamically on visible layout.
  }
}
