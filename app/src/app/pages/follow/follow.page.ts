import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { FollowService } from 'src/app/services/follow.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.page.html',
  styleUrls: ['./follow.page.scss'],
})
export class FollowPage implements OnInit {
  loading: boolean = false;
  follows: any[] = [];

  constructor(private router: Router, private menu: MenuService, private followService: FollowService, private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.authUser) {
      this.getFollows();
    }

    this.authService.authChanged.subscribe(() => {
      this.getFollows();
    });
  }

  getFollows() {
    this.loading = true;
    console.log('getfollows')
    this.follows = this.followService.getFollowsByAuthUser(this.authService.authUser);
    this.loading = false;
    console.log(this.follows)
  }

  openNav() {
    this.menu.openNav();
  }

  goToUser(uid) {
    this.router.navigate([`user/${uid}/main`]);
  }

}
