# raw-state
Super-simple state management library for JavaScript/TypeScript apps

# Usage
It's as simple as import and use!

## Import
```javascript
import { rawState } from 'raw-state';
```

## To write to state
From any file, module, or function
```javascript
rawState.age = 29;
rawState.greeting = 'hello world';
rawState.startTime = new Date();
rawState.user = { username: 'jo', first: 'Jo', last: 'Kim', email: 'jo@kim.com'};
```
or
```javascript
rawState['age'] = 29;
rawState['greeting'] = 'hello world';
rawState['startTime'] = new Date();
rawState['user'] = { username: 'jo', first: 'Jo', last: 'Kim', email: 'jo@kim.com'};
```
or
```javascript
rawState.set('age', 29);
rawState.set('greeting', 'hello world');
rawState.set('startTime', new Date());
rawState.set('user', { username: 'jo', first: 'Jo', last: 'Kim', email: 'jo@kim.com'});
```

## To read from state
```javascript
const age = rawState.get('age');
const greeting = rawState.get('greeting');
const startTime = rawState.get('startTime');
const {username, first, last, email} = rawState.get('user');
```
It returns undefined if the key doesn't exist.
Coming soon: If you want it to throw instead, use `rawState['age']`.
