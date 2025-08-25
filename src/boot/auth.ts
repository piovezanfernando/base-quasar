
export default async ({ router }) => {
  router.beforeEach(async (to, from, next) => {
    let accessToken = localStorage.getItem('access_token');

    // Se já temos o token, prosseguir
    if (accessToken) {
      to.meta.requiresAuth = true;
      return next();
    }

    // Verificar se recebemos o token na URL de callback
    const urlParams = new URLSearchParams(window.location.search);
    accessToken = urlParams.get('access_token');
    if (accessToken) {
      console.log('Recebemos o token na URL de callback. Salvando no localStorage e redirecionando...');
      localStorage.setItem('access_token', accessToken);
      const newUrl = window.location.pathname; // Remove os query params
      window.history.replaceState({}, document.title, newUrl);
      to.meta.requiresAuth = true;
      return next();
    }

    // Se não há token, redirecionar para o SSO com client_id e client_secret na URL
    const baseURL = window.location.origin;
    const redirect = `${baseURL}`; // Ajuste para /diario/ se necessário
    const ssoUrl = `http://localhost/auth/login?redirect_uri=${encodeURIComponent(redirect)}&client_id=9e341f3b-41fc-4385-93ee-08357bc2ae2f&client_secret=LjUaASmi1czYSRNnhslRxdjsPVsffEgRvhLylJ3V`;
    console.log('Redirecionando para o SSO:', ssoUrl);
    window.location.href = ssoUrl;

    // Não chamar next() aqui, pois o redirecionamento sai do fluxo
  });
};