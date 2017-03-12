import * as firebaseOrigin from 'firebase';
import firebase, { auth } from './../../src/server/firebaseAuth';
import { MockFirebase } from 'mockfirebase';

describe('Firebase', () => {

  beforeEach(async () => {
    await firebase.auth().signOut();
  })

  test('getter isSigned is return boolean', async () => {
    expect(auth.isSigned).toBeFalsy();
    expect(auth.isSignedCustomer).toBeFalsy();
    await auth.authCustomer('testCompany');
    expect(auth.isSigned).toBeTruthy();
    expect(auth.isSignedCustomer).toBeTruthy();
  });

  test('getter uid is return string | null', async () => {
    firebase.auth().onAuthStateChanged((anonymouslyUser: firebase.User) => {
      const user = firebase.auth().currentUser;
      if (user.isAnonymous || user.emailVerified) {
        expect(auth.uid).toBeInstanceOf('string');
      } else {
        expect(auth.uid).toBeNull();
      }
    });
    await auth.authCustomer('testCompany');
  });

  test('getter isResumeAccpetedAsync is return Promise', async () => {
    expect(await auth.isResumeAccpetedAsync).toBeFalsy();
  });

  test('./firebae is equal be firebase', () => {
    expect(firebase).toBe(firebaseOrigin);
  });

});
