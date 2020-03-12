export const environment = {
  production: true,
  api: {
    protocol: 'http',
    host: 'dev.code-education.com.br',
    get url() {
      return `${this.protocol}://${this.host}/api`
    }
  }
};
