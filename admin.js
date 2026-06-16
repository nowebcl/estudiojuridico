(function() {
  // Check if admin is logged in
  if (localStorage.getItem('admin_logged_in') !== 'true') {
    return;
  }

  // Inject Editor CSS Styles
  const css = `
    /* Admin Toolbar */
    .admin-toolbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 50px;
      background-color: #111111;
      color: #ffffff;
      z-index: 100000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 24px;
      border-bottom: 2px solid #93731b;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
    .admin-toolbar-title {
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #b69f75;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .admin-toolbar-title::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: #2b7040;
      border-radius: 50%;
      box-shadow: 0 0 8px #2b7040;
    }
    .admin-toolbar-actions {
      display: flex;
      gap: 12px;
    }
    .admin-btn {
      padding: 8px 16px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .admin-btn-save {
      background-color: #93731b;
      color: #ffffff;
      border-color: #93731b;
    }
    .admin-btn-save:hover {
      background-color: #b69f75;
      border-color: #b69f75;
    }
    .admin-btn-logout {
      background-color: transparent;
      color: #cccccc;
      border-color: #444444;
    }
    .admin-btn-logout:hover {
      color: #ffffff;
      border-color: #cccccc;
    }

    /* Shift layout down */
    body {
      margin-top: 50px !important;
    }
    .site-header {
      top: 50px !important;
    }

    /* Editable States */
    .admin-editable {
      outline: 1px dashed transparent;
      transition: outline 0.2s ease, background-color 0.2s ease;
    }
    .admin-editable:hover {
      outline: 1px dashed #93731b !important;
      cursor: text;
    }
    .admin-editable:focus {
      outline: 2px solid #93731b !important;
      background-color: rgba(147, 115, 27, 0.05) !important;
    }

    /* Image Floating Button */
    #adminFloatingImageBtn {
      position: absolute;
      display: none;
      z-index: 100010;
      background-color: rgba(17, 17, 17, 0.9);
      color: #ffffff;
      border: 1px solid #93731b;
      padding: 6px 12px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      font-family: inherit;
      transition: all 0.2s ease;
    }
    #adminFloatingImageBtn:hover {
      background-color: #93731b;
      color: #ffffff;
    }

    /* Modal Styling */
    .admin-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(5px);
      z-index: 100020;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .admin-modal {
      width: 100%;
      max-width: 480px;
      background-color: #1e1e1e;
      border: 1px solid #2e2e2e;
      border-top: 3px solid #93731b;
      padding: 30px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
    }
    .admin-modal-title {
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #ffffff;
      margin-bottom: 20px;
      border-bottom: 1px solid #2e2e2e;
      padding-bottom: 10px;
    }
    .admin-modal-group {
      margin-bottom: 20px;
    }
    .admin-modal-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      color: #b3b3b3;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .admin-modal-input {
      width: 100%;
      padding: 10px 14px;
      border: 1px solid #3e3e3e;
      background-color: #2a2a2a;
      color: #ffffff;
      font-size: 0.85rem;
    }
    .admin-modal-input:focus {
      outline: none;
      border-color: #93731b;
    }
    .admin-modal-divider {
      text-align: center;
      margin: 15px 0;
      color: #666666;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      position: relative;
    }
    .admin-modal-divider::before,
    .admin-modal-divider::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 40%;
      height: 1px;
      background-color: #2e2e2e;
    }
    .admin-modal-divider::before { left: 0; }
    .admin-modal-divider::after { right: 0; }
    
    .admin-modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 25px;
    }

    /* Toast Notification */
    .admin-toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background-color: #111111;
      color: #ffffff;
      border-left: 4px solid #2b7040;
      border-top: 1px solid #2e2e2e;
      border-bottom: 1px solid #2e2e2e;
      border-right: 1px solid #2e2e2e;
      padding: 16px 24px;
      font-size: 0.85rem;
      font-weight: 500;
      z-index: 100030;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      gap: 10px;
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .admin-toast.active {
      transform: translateY(0);
      opacity: 1;
    }
    .admin-toast.error {
      border-left-color: #b83232;
    }

    /* Popover for links */
    #adminLinkPopover {
      position: absolute;
      display: none;
      z-index: 100015;
      background-color: #111111;
      border: 1px solid #93731b;
      padding: 4px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      border-radius: 4px;
    }
    .admin-popover-btn {
      background: none;
      border: none;
      color: #ffffff;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
      padding: 4px 8px;
      font-family: inherit;
      transition: all 0.2s ease;
    }
    .admin-popover-btn:hover {
      color: #b69f75;
    }
  `;

  // Inject Styles
  const styleEl = document.createElement('style');
  styleEl.id = 'adminInjectedStyles';
  styleEl.innerHTML = css;
  document.head.appendChild(styleEl);

  // Initialize Admin Editor once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEditor);
  } else {
    initEditor();
  }

  function initEditor() {
    createToolbar();
    setupEditableTexts();
    setupEditableImages();
    createLinkPopover();
    setupUnloadWarning();
  }

  // Create Header Toolbar
  function createToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'admin-toolbar';
    toolbar.innerHTML = `
      <div class="admin-toolbar-title">Modo Administrador Activo</div>
      <div class="admin-toolbar-actions">
        <button id="adminSaveBtn" class="admin-btn admin-btn-save">Guardar Cambios</button>
        <button id="adminLogoutBtn" class="admin-btn admin-btn-logout">Salir</button>
      </div>
    `;
    document.body.appendChild(toolbar);

    // Bind Actions
    document.getElementById('adminSaveBtn').addEventListener('click', saveChanges);
    document.getElementById('adminLogoutBtn').addEventListener('click', logout);
  }

  // Setup Contenteditable for texts
  function setupEditableTexts() {
    const textSelectors = 'h1, h2, h3, h4, p, .btn-gold, .drawer-link, .lawyer-name, .lawyer-title, .lawyer-bio, .footer-info p, .close-text';
    const elements = document.querySelectorAll(textSelectors);
    
    elements.forEach(el => {
      // Exclude toolbar & modals
      if (el.closest('.admin-toolbar') || el.closest('.admin-modal')) return;

      el.setAttribute('contenteditable', 'true');
      el.classList.add('admin-editable');

      // Prevent link clicks so user can click to edit text without navigating
      if (el.tagName === 'A') {
        el.addEventListener('click', preventLinkClick);
      }
    });
  }

  function preventLinkClick(e) {
    e.preventDefault();
  }

  // Popover functionality for links
  let activeLink = null;
  let popoverEl = null;

  function createLinkPopover() {
    popoverEl = document.createElement('div');
    popoverEl.id = 'adminLinkPopover';
    popoverEl.innerHTML = `<button class="admin-popover-btn">Ir a la página ➜</button>`;
    document.body.appendChild(popoverEl);

    popoverEl.querySelector('.admin-popover-btn').addEventListener('click', (e) => {
      e.preventDefault();
      if (activeLink) {
        window.location.href = activeLink.getAttribute('href');
      }
    });

    // Close popover when clicking elsewhere
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a.admin-editable');
      if (link) {
        activeLink = link;
        const rect = link.getBoundingClientRect();
        
        // Position popover right below the link, centered
        popoverEl.style.top = `${rect.bottom + window.scrollY + 6}px`;
        popoverEl.style.left = `${rect.left + window.scrollX + (rect.width / 2) - 60}px`;
        popoverEl.style.display = 'block';
      } else if (!e.target.closest('#adminLinkPopover')) {
        popoverEl.style.display = 'none';
        activeLink = null;
      }
    });
  }

  // Setup Image hovers
  let activeImage = null;
  function setupEditableImages() {
    const floatingBtn = document.createElement('button');
    floatingBtn.id = 'adminFloatingImageBtn';
    floatingBtn.innerText = '📷 Cambiar Imagen';
    document.body.appendChild(floatingBtn);

    // Event delegation for img hover
    document.addEventListener('mouseover', (e) => {
      const img = e.target.closest('img');
      if (img) {
        if (img.closest('.admin-toolbar') || img.closest('.admin-modal')) return;
        
        activeImage = img;
        const rect = img.getBoundingClientRect();
        
        // Position button at top-left of image, offset inside by 10px
        floatingBtn.style.top = `${rect.top + window.scrollY + 10}px`;
        floatingBtn.style.left = `${rect.left + window.scrollX + 10}px`;
        floatingBtn.style.display = 'block';
      } else if (e.target !== floatingBtn) {
        floatingBtn.style.display = 'none';
      }
    });

    floatingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (activeImage) {
        openImageModal(activeImage);
      }
    });
  }

  // Open Change Image Modal
  function openImageModal(img) {
    const overlay = document.createElement('div');
    overlay.className = 'admin-modal-overlay';
    overlay.innerHTML = `
      <div class="admin-modal">
        <h3 class="admin-modal-title">Cambiar Imagen</h3>
        
        <div class="admin-modal-group">
          <label class="admin-modal-label">Dirección URL de la Imagen</label>
          <input type="text" id="adminImgUrl" class="admin-modal-input" placeholder="https://ejemplo.com/imagen.jpg" value="${img.src.startsWith('data:') ? '' : img.src}">
        </div>
        
        <div class="admin-modal-divider">o</div>
        
        <div class="admin-modal-group">
          <label class="admin-modal-label">Cargar Archivo Local</label>
          <input type="file" id="adminImgFile" class="admin-modal-input" accept="image/*">
        </div>
        
        <div class="admin-modal-actions">
          <button id="adminCancelImgBtn" class="admin-btn admin-btn-logout">Cancelar</button>
          <button id="adminApplyImgBtn" class="admin-btn admin-btn-save">Aplicar</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const cancelBtn = document.getElementById('adminCancelImgBtn');
    const applyBtn = document.getElementById('adminApplyImgBtn');
    const fileInput = document.getElementById('adminImgFile');
    const urlInput = document.getElementById('adminImgUrl');

    cancelBtn.addEventListener('click', () => overlay.remove());

    applyBtn.addEventListener('click', () => {
      const file = fileInput.files[0];
      const url = urlInput.value.trim();

      if (file) {
        // Read file as Base64 and upload to server
        applyBtn.textContent = 'Subiendo...';
        applyBtn.disabled = true;

        const reader = new FileReader();
        reader.onload = function(evt) {
          // Generate a clean filename: timestamp + original name
          const cleanName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
          
          fetch('/admin/upload-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: cleanName,
              base64Data: evt.target.result
            })
          })
          .then(res => res.json())
          .then(data => {
            if (data.status === 'success') {
              img.src = data.url;
              overlay.remove();
              showToast('Imagen actualizada exitosamente.');
            } else {
              throw new Error(data.message || 'Error desconocido');
            }
          })
          .catch(err => {
            alert('Error al subir la imagen: ' + err.message);
            applyBtn.textContent = 'Aplicar';
            applyBtn.disabled = false;
          });
        };
        reader.readAsDataURL(file);
      } else if (url) {
        img.src = url;
        overlay.remove();
        showToast('Imagen actualizada con URL.');
      } else {
        overlay.remove();
      }
    });
  }

  // Save changes to Server
  function saveChanges() {
    const saveBtn = document.getElementById('adminSaveBtn');
    saveBtn.textContent = 'Guardando...';
    saveBtn.disabled = true;

    // Clone DOM to clean it up before sending
    const clone = document.documentElement.cloneNode(true);

    // Remove Admin Toolbar
    const toolbar = clone.querySelector('.admin-toolbar');
    if (toolbar) toolbar.remove();

    // Remove Floating image edit button
    const flBtn = clone.querySelector('#adminFloatingImageBtn');
    if (flBtn) flBtn.remove();

    // Remove any modal overlay if open
    const modal = clone.querySelector('.admin-modal-overlay');
    if (modal) modal.remove();

    // Remove Link Popover if present
    const linkPopover = clone.querySelector('#adminLinkPopover');
    if (linkPopover) linkPopover.remove();

    // Remove injected Stylesheet
    const injectedStyles = clone.querySelector('#adminInjectedStyles');
    if (injectedStyles) injectedStyles.remove();

    // Strip contenteditable attributes & classes
    clone.querySelectorAll('[contenteditable]').forEach(el => {
      el.removeAttribute('contenteditable');
    });
    clone.querySelectorAll('.admin-editable').forEach(el => {
      el.classList.remove('admin-editable');
    });

    // Remove temporary active states added by Javascript runtime
    const body = clone.querySelector('body');
    if (body) {
      body.classList.remove('menu-open');
      body.style.removeProperty('margin-top');
    }
    
    const header = clone.querySelector('#siteHeader');
    if (header) {
      header.classList.remove('scrolled');
      header.style.removeProperty('top');
    }

    clone.querySelectorAll('.menu-drawer.active').forEach(el => el.classList.remove('active'));
    clone.querySelectorAll('.menu-drawer-overlay.active').forEach(el => el.classList.remove('active'));
    clone.querySelectorAll('.reveal.active').forEach(el => el.classList.remove('active'));

    // Construct final clean HTML
    const cleanHtml = '<!DOCTYPE html>\n' + clone.outerHTML;

    // Extract current filename
    let filename = window.location.pathname.split('/').pop();
    if (!filename || filename === 'admin' || filename === 'admin/') {
      filename = 'index.html';
    }

    // Send save POST request
    fetch('/admin/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: filename,
        html: cleanHtml
      })
    })
    .then(res => res.json())
    .then(data => {
      saveBtn.textContent = 'Guardar Cambios';
      saveBtn.disabled = false;
      if (data.status === 'success') {
        showToast('¡Todos los cambios se han guardado permanentemente!');
        // Reset unload flag
        window.onbeforeunload = null;
      } else {
        showToast('Error al guardar los cambios: ' + data.message, true);
      }
    })
    .catch(err => {
      saveBtn.textContent = 'Guardar Cambios';
      saveBtn.disabled = false;
      showToast('Error de red al guardar: ' + err.message, true);
    });
  }

  // Toast message helper
  function showToast(message, isError = false) {
    // Remove existing toast if any
    const oldToast = document.querySelector('.admin-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = `admin-toast ${isError ? 'error' : ''}`;
    toast.innerText = message;
    document.body.appendChild(toast);

    // Trigger animate-in
    setTimeout(() => toast.classList.add('active'), 50);

    // Animate-out and remove
    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // Ask before leaving page if changes were made
  function setupUnloadWarning() {
    document.addEventListener('input', () => {
      window.onbeforeunload = function() {
        return 'Tienes cambios sin guardar en esta página. ¿Estás seguro de que quieres salir?';
      };
    });
  }

  // Logout Admin
  function logout() {
    localStorage.removeItem('admin_logged_in');
    window.location.reload();
  }
})();
