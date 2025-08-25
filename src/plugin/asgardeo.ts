import { AsgardeoSPAClient } from '@asgardeo/auth-spa';

let authClient: AsgardeoSPAClient;

async function initializeAsgardeo(app) {
  authClient = AsgardeoSPAClient.getInstance();
  await authClient.initialize({
    // signInRedirectURL: `${window.location.origin}`,
    signInRedirectURL: `${window.location.origin}`,
    clientID: '1_fmysRxuUjWzqnfEFq13okbIwoa', // Substitua pelo seu client ID do WSO2
    baseUrl: 'https://piovezan:9445/t/carbon.super',
    scope: ['profile', 'openid']
  });

  // Verifica se o usuário está autenticado
  const authenticated = await authClient.isAuthenticated();

  if (authenticated) {
    const token = await authClient.getAccessToken();
    console.log('Token de Acesso:', token);
    app.config.globalProperties.$authClient = authClient;
  } else {
    console.warn('Usuário não autenticado');
  }

  return authenticated;
}

export default {
  install: (app) => initializeAsgardeo(app),
};

export { authClient };
