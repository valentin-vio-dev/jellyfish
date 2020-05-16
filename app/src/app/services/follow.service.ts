import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private userService: UserService) { }

  getFollowsByAuthUser(authUser) {
    let follows = [];
    authUser.follows.forEach(async user => {
      let uid = user.uid;
      let userReceived;
      await this.userService.getUserById(uid).then((user) => {
        userReceived = user.data();
        userReceived['uid'] = user.id;
      });
      console.log(userReceived)
      follows.push(userReceived);
    });
    return follows;
  }
}
