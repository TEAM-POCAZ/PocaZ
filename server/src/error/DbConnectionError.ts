class DbConnectionError extends Error {
  constructor(...args: any[]) {
    super(...args);
    this.name = 'DbConnectionError';
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}

export { DbConnectionError };
