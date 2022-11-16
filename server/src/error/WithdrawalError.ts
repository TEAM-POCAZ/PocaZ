class WithdrawalError extends Error {
  constructor(...args: any[]) {
    super(...args);
    this.name = 'WithdrawalError';
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}

export { WithdrawalError };
