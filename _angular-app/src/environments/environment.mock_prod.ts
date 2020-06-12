export const environment = {
  production: true,
  api: {
    protocol: 'http',
    host: '192.168.1.6:8000',
    get url() {
      return `${this.protocol}://${this.host}/api`
    }
  }
};
