import type {UserRecord} from '../types';

export const svc: UserRecord = {
  id: '32c3a63c-9f3d-4d7b-ae82-157068d0ec90',
  googleId: null,
  givenName: null,
  familyName: null,
  name: '"scripture.study service account"',
  email: '"svc@scripture.study"',
  photo: null,
};

export const johnDoe: UserRecord = {
  id: 'c4036a35-d896-48a1-93c5-60d2daa3d957',
  googleId: '89658988316513984527',
  givenName: 'John',
  familyName: 'Doe',
  name: 'John Doe',
  email: 'johndoe@example.com',
  photo: 'https://john/doe.png',
};

export default [svc, johnDoe];
