import { RawStateGetEmptyError } from '../src/exceptions.js';
import { rawState } from '../src/index.js';

// Arrange
// Act
// Assert

describe("rawState", () => {

  beforeEach(() => {
    rawState.clear();
  });

  afterEach(() => {
    //console.log({ globalThis })
  })

  it(".clear() clears out all state", () => {
    // Arrange
    rawState.set('clear_value_1', 'set');
    rawState.set('clear_value_2', 'set');
    rawState.set('clear_value_3', 'set');
    expect(rawState.get('clear_value_1')).toBe('set');
    // Act
    rawState.clear();
    // Assert
    expect(() => rawState.get('clear_value_1')).toThrow(RawStateGetEmptyError);
    expect(() => rawState.get('clear_value_2')).toThrow(RawStateGetEmptyError);
    expect(() => rawState.get('clear_value_3')).toThrow(RawStateGetEmptyError);
  });

  it("can read using `.get()`", () => {
    // Arrange
    rawState.set('age', 29);
    rawState.set('greeting', 'hello world');
    const t = new Date();
    rawState.set('startTime', t);
    rawState.set('user', { username: 'jo', first: 'Jo', last: 'Kim', email: 'jo@kim.com' });
    // Act
    const age = rawState.get('age');
    const greeting = rawState.get('greeting');
    const startTime = rawState.get('startTime');
    const { username, first, last, email } = rawState.get('user');
    // Assert
    expect(age).toBe(29);
    expect(greeting).toBe('hello world');
    expect(startTime).toBe(t);
    expect(username).toBe('jo');
    expect(first).toBe('Jo');
    expect(last).toBe('Kim');
    expect(email).toBe('jo@kim.com');
  });

  it("can write using `.set()`", () => {
    // Arrange
    const kv = Array.from({ length: 500 }, (_, i) => [`k${i}`, Math.random()]);
    // Act
    kv.forEach(e => rawState.set(e[0], e[1]));
    // Assert
    for (let [k, v] of kv) {
      expect(rawState.get(k)).toBeDefined()
      expect(rawState.get(k)).toBe(v)
      expect(rawState[k]).toBeDefined()
      expect(rawState[k]).toBe(v)
    }
  });

  it("can read using square brackets", () => {
    // Arrange
    rawState.set('age', 29);
    rawState.set('greeting', 'hello world');
    const t = new Date();
    rawState.set('startTime', t);
    rawState.set('user', { username: 'jo', first: 'Jo', last: 'Kim', email: 'jo@kim.com' });
    // Act
    const age = rawState['age'];
    const greeting = rawState['greeting'];
    const startTime = rawState['startTime'];
    const { username, first, last, email } = rawState['user'];
    // Assert
    expect(age).toBe(29);
    expect(greeting).toBe('hello world');
    expect(startTime).toBe(t);
    expect(username).toBe('jo');
    expect(first).toBe('Jo');
    expect(last).toBe('Kim');
    expect(email).toBe('jo@kim.com');
  });

  it("can write using square brackets", () => {
    // Arrange
    const kv = Array.from({ length: 500 }, (_, i) => [`k${i}`, Math.random()]);
    // Act
    kv.forEach(e => rawState[e[0]] = e[1]);
    // Assert
    for (let [k, v] of kv) {
      expect(rawState.get(k)).toBeDefined()
      expect(rawState.get(k)).toBe(v)
      expect(rawState[k]).toBeDefined()
      expect(rawState[k]).toBe(v)
    }
  });

  it("does not pollute globalThis except for the rawState key", () => {
    // Arrange
    // Act
    rawState.set('foo', 'bar');
    // Assert
    expect(globalThis.hasOwnProperty('foo')).toBeFalsy();
    expect(globalThis.hasOwnProperty('setInterval')).toBeTruthy();
    expect(globalThis.hasOwnProperty('console')).toBeTruthy();
    expect(globalThis.hasOwnProperty('fetch')).toBeTruthy();
  });
});

