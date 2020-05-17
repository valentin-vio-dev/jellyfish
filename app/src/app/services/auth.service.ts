import { Injectable, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseConfig } from '../../environments/firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUser: any = null;
  authChanged: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {
    if(localStorage.getItem('uid')) {
      let id = localStorage.getItem('uid');
      this.setAuthUser(id);
    }else{
      router.navigate(['login']);
    }

  }

  signIn(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signUp(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signUpExtras(uid, firstname, lastname, role, email) {
    return firebase.database().app.firestore().collection('users').doc(uid).set({
      firstname,
      lastname,
      role,
      email,
      follows: []
    });
  }

  getUserById(uid): Promise<any> {
    return firebase.database().app.firestore().collection('users').doc(uid).get();
  }

  async setAuthUser(uid) {
    localStorage.setItem('uid', uid);
    await firebase.database().app.firestore().collection('users').doc(uid).get().then(doc => {
      if(doc.exists) {
        this.authUser = doc.data();
        this.authUser['uid'] = uid;
        this.authChanged.emit(null);
      }
      
    }).catch(err => {
      console.log(err)
    });
    console.log('AUTHUSER', this.authUser)
  }

  signOut() {
    this.authUser = null;
    this.router.navigate(['login']);
  }

  refreshAuthUser() {
    this.setAuthUser(this.authUser.uid);
  }
}
