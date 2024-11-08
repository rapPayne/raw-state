import { RawStateGetEmptyError } from "./exceptions";

const clear = () => {
  Object.keys(rs).forEach(key => delete rs[key]);
}

const get = (key) => {
  const value = rs[key];
  if (value == null || value == undefined) throw new RawStateGetEmptyError(`The key ${key} doesn't exist in rawState`);
  return value;
}

const set = (key, value) => {
  rs[key] = value;
}


// The key to everything! All state is written to and read from globalThis['rawState']
function RawState() { }
RawState.prototype = {
  clear, get, set, RawStateGetEmptyError
}
let rs = new RawState();
globalThis['rawState'] = rs;

export const rawState = rs;
export default rawState;