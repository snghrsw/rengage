import firebase, { auth } from './../src/server/firebase';

describe('Firebase', () => {

  const testUserLogin =
    firebase.auth().createUserWithEmailAndPassword('testuser@example.com', 'testuser');

  it('getter isSigned is return boolean', () => {
    expect(auth.isSigned).toBeFalsy();
    testUserLogin.then(() => expect(auth.isSigned).toBeTruthy());
  });

  it('getter getUid is return string | null', () => {
    expect(auth.uid).toBeNull();
    testUserLogin.then(() => expect(auth.uid).toBeInstanceOf('string'));
  });

});
