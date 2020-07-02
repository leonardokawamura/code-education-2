export const environment = {
  production: false,
  api: {
    protocol: 'http',
    host: '192.168.1.6:8000',
    get url() {
      return `${this.protocol}://${this.host}/api`
    }
  },
  baseFilesUrl: 'http://192.168.1.6:8000/storage',
  showFirebaseUI: !document.URL.startsWith('file:///'),
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
    new RegExp('dev.code-education.com.br/*'),
    new RegExp('192.168.1.6:8000/*'),
    new RegExp('192.168.1.6:8100/*'),
    new RegExp('192.168.1.4:5555/*')
  ]
};