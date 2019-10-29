
export const environment = {
  production: true,
  signalR: {
    baseUrl: 'http://api.andkra.eu:8000/api/',
  },
  ghost: {
    baseUrl: 'http://blog.andkra.eu/',
    contentApiUrl: 'ghost/api/v2/content/',
    apiKey: process.env.GHOST_API_KEY
  }
};
