export const environment = {
  assetsUrl:
    window.location.hostname === 'localhost'
      ? 'https://localhost:7253/assets/'
      :  'http://172.20.10.6:5113/assets/',
  apiUrl:
    window.location.hostname === 'localhost'
      ? 'https://localhost:7253/api/'
      : 'http://172.20.10.6:5113/api/',
  CART_KEY: 'cartKey',
  token_KEY: 'token',
  language_KEY: 'language',
};
