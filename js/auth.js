// Configurazione di Auth0
const auth0 = await createAuth0Client({
    domain: 'dev-n12gidsbd2j5gt4l.us.auth0.com', // Sostituisci con il tuo dominio Auth0
    client_id: 'VcPsuhxzxu83vuzG0bac0oylSGpNZ7t9', // Sostituisci con l'ID client della tua applicazione Auth0
    redirect_uri: window.location.origin // Usa l'origine corrente come redirect URI
  });
  
  // Funzione per verificare se l'utente è autenticato
  async function isAuthenticated() {
    return await auth0.isAuthenticated();
  }
  
  // Funzione per ottenere i dati dell'utente autenticato
  async function getUser() {
    if (await isAuthenticated()) {
      return await auth0.getUser();
    }
    return null;
  }
  
  // Funzione per avviare il login
  async function login() {
    await auth0.loginWithRedirect();
  }
  
  // Funzione per gestire il callback dopo il login (URL di redirect)
  async function handleAuth() {
    const query = window.location.search;
    if (query.includes('code=') && query.includes('state=')) {
      await auth0.handleRedirectCallback();
      window.history.replaceState({}, document.title, window.location.pathname); // Rimuovi i parametri di Auth0 dall'URL
    }
  }
  
  // Funzione per effettuare il logout
  async function logout() {
    await auth0.logout({ returnTo: window.location.origin });
  }
  
  // Funzione per ottenere un access token (per chiamare API protette)
  async function getToken() {
    if (await isAuthenticated()) {
      return await auth0.getTokenSilently();
    }
    return null;
  }
  
  // Inizializzazione e gestione dell'autenticazione
  async function initAuth() {
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