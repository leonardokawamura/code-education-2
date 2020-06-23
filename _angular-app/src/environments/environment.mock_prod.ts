export const environment = {
  production: true,
  api: {
    protocol: 'http',
    host: '192.168.1.6:8000',
    get url() {
      return `${this.protocol}://${this.host}/api`
    }
  },
  firebaseConfig: {
    apiKey: "AIzaSyD0_2--czFM1gy2zt8HETDI780l9sCkzzs",
    authDomain: "whatsapp-de-vendas.firebaseapp.com",
    databaseURL: "https://whatsapp-de-vendas.firebaseio.com",
    projectId: "whatsapp-de-vendas",
    storageBucket: "whatsapp-de-vendas.appspot.com",
    messagingSenderId: "462348407056",
    appId: "1:462348407056:web:d14cb2397a4b6a5aced595"
  },
  whiteListDomains: [
    new RegExp('dev.code-education.com.br/*'),
    new RegExp('192.168.1.6:8000/*')
  ]
};
