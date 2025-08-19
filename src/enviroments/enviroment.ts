export const environment = {
  production: false,
  kick: {
    clientId: '01K2JCYXYDBHDND501GSG4Y3NZ',
    authUrl: 'https://id.kick.com/oauth/authorize',
    tokenUrl: 'https://id.kick.com/oauth/token',
    redirectUri: 'http://localhost:4200/auth/callback',
    scopes: ['user:read', 'information']
  }
};
