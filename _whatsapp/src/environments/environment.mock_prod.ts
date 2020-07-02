export const environment = {
  production: true,
  api: {
    protocol: 'https',
    host: 'whatsapp-de-vendas-281219.rj.r.appspot.com',
    get url() {
      return `${this.protocol}://${this.host}/api`
    }
  },
  baseFilesUrl: 'https://storage.googleapis.com/whatsapp-de-vendas-281219.appspot.com',
  showFirebaseUI: false,
  firebaseConfig: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  },
  whiteListDomains: [    
    new RegExp('whatsapp-de-vendas-281219.rj.r.appspot.com/*')
  ]
};