import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseConfig } from '../../environments/firebase';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService) { }

  followUser(uidWho: string, uidWhom: string) {
    return firebase.database().app.firestore().collection('users').doc(uidWho).update({
      follows: firebase.firestore.FieldValue.arrayUnion({
        uid: uidWhom
      })
    });
  }

  unfollowUser(user: any, uidWhom: string) {
    let filteredFollow = user.follows.filter(follow => {
      return follow.uid != uidWhom;
    });
    
    return firebase.database().app.firestore().collection('users').doc(user.uid).update({
      follows: filteredFollow
    });
  }

  addRecToLibrary(uid: string, recId: string) {
    return firebase.database().app.firestore().collection('users').doc(uid).update({
      libs: firebase.firestore.FieldValue.arrayUnion({
        recId: recId
      })
    });
  }

  removeRecFromLibrary(user: any, recId: string) {
    let filteredRecs = user.libs.filter(lib => {
      return lib.recId != recId;
    });
    return firebase.database().app.firestore().collection('users').doc(user.uid).update({
      libs: filteredRecs
    });
  }

  updateProfilePicture(uid: string, file: any): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let task = firebase.storage().ref('profile_pictures/' + uid).put(file);
      task.on('state_changed', () => {
        // progress
      }, (err) => {
        // error
      }, () => {
        // complete
        console.log('done');
        this.addProfileUrlToUser(uid).then(() => {
          this.authService.refreshAuthUser();
          resolve();
        });
      });
    });
    return promise;
  }

  async addProfileUrlToUser(uid: string) {
    let url;
    await firebase.storage().refFromURL(`gs://epoc-signals-fire.appspot.com/profile_pictures/${uid}`).getDownloadURL().then((res) => {
      url = res;
    });
    console.log(url)
    return firebase.database().app.firestore().collection('users').doc(uid).update({
      pic: url
    });
  }

  getUserById(uid): Promise<any> {
    return firebase.database().app.firestore().collection('users').doc(uid).get();
  }

}
