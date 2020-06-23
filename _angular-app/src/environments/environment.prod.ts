export const environment = {
  production: true,
  api: {
    protocol: 'https',
    host: 'whatsapp-de-vendas-281219.rj.r.appspot.com',
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
    new RegExp('whatsapp-de-vendas-281219.rj.r.appspot.com/*')
  ]
};
