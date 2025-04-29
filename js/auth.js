// Inizializzazione e gestione dell'autenticazione
async function initAuth() { // Ho aggiunto 'async' qui
    await handleAuth(); // Gestisci il callback all'avvio
  
    const authenticated = await isAuthenticated();
    const user = await getUser();
    const token = await getToken();
  
    // Aggiorna l'UI in base allo stato di autenticazione e ai dati dell'utente
    console.log('Autenticato:', authenticated);
    console.log('Utente:', user);
    console.log('Token:', token);
  
    // Esempio di aggiornamento dell'UI
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const userProfile = document.getElementById('user-profile');
  
    if (loginButton) loginButton.onclick = login;
    if (logoutButton) logoutButton.onclick = logout;
  
    if (authenticated && userProfile) {
      userProfile.innerHTML = `<p>Ciao, ${user.name}!</p><pre>${JSON.stringify(user, null, 2)}</pre>`;
    } else if (userProfile) {
      userProfile.innerHTML = '<p>Non sei autenticato.</p>';
    }
  }
  
  // Avvia l'inizializzazione dell'autenticazione
  initAuth();