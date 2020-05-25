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
  showFirebaseUi: !document.URL.startsWith('file:///')
};