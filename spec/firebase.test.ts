import firebase, { isAuthLogin } from './../src/server/firebase';

describe('Firebase', () => {
  it('isAuthLogin() is return boolean', () => {
    expect(isAuthLogin()).toBe(false);
    firebase.auth().createUserWithEmailAndPassword('testuser@example.com', 'testuser')
      .then(() => expect(isAuthLogin()).toBe(true));
  });
});
