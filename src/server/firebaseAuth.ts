import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA6S3ZeHmkNO6mGI50Tj1WXkMN2PZjaldM',
  authDomain: 'rengage-59716.firebaseapp.com',
  databaseURL: 'https://rengage-59716.firebaseio.com',
  storageBucket: 'rengage-59716.appspot.com',
  messagingSenderId: '624253082462',
};

class Auth {
  private instance: firebase.app.App;

  constructor() {
    this.instance = firebase.initializeApp(config);
  }

  public authCustomer(companyName: string): firebase.Promise<any> {
    firebase.auth().onAuthStateChanged(this.createCustomerApplicateIfNotting(companyName));
    return firebase.auth().signInAnonymously();
  }

  public authAdmin(username: string, password: string): firebase.Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(username, password);
  }

  private createCustomerApplicateIfNotting(companyName: string) {
    return (anonymouslyUser: firebase.User) => {
      const applicate = firebase.database().ref(`applicate/${anonymouslyUser.uid}`);
      applicate.once('value').then(snapshot => {
        if (!snapshot.val()) {
          applicate.set({
            companyName,
            isResumeAccepted: false,
          });
        }
      });
    };
  }

  get isSigned(): boolean {
    return this.instance.auth().currentUser !== null;
  }

  get isSignedAdmin(): boolean {
    return this.isSigned && this.instance.auth().currentUser.emailVerified;
  }

  get isSignedCustomer(): boolean {
    return this.isSigned && this.instance.auth().currentUser.isAnonymous;
  }

  get uid(): string | null {
    return this.isSigned ? this.instance.auth().currentUser.uid : null;
  }

  get isResumeAccpetedAsync(): Promise<boolean> {
    return new Promise(resolve => {
      if (!this.isSignedCustomer) {
        return resolve(false);
      }

      firebase.database()
        .ref(`applicate/${this.uid}/isResumeAccepted`)
        .once('value', snapshot => {
          return resolve(Boolean(snapshot.val()));
        });
    });
  }
}

export const auth: Auth = new Auth();
export default firebase;
