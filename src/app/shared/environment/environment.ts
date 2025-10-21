export const environment = {
  assetsUrl:
    window.location.hostname === 'localhost'
      ? 'https://localhost:44360/assets/'
      : 'https://rasoul.runasp.net/assets/',
  apiUrl:
    window.location.hostname === 'localhost'
      ? 'https://localhost:44360/api/'
      : 'https://rasoul.runasp.net/api/',
  CART_KEY: 'cartKey',
  token_KEY: 'token',
  language_KEY: 'language',
};
