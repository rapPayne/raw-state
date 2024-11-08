
export class RawStateGetEmptyError extends Error {
  constructor(message) {
    super(message);
    this.name = `RawStateGetEmptyError`;
  }
}