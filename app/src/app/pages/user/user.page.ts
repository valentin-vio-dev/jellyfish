import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { Record } from 'src/models/Record';
import { CloudService } from 'src/app/services/cloud.service';
import { SignalPacket } from 'src/models/SignalPacket';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit, OnDestroy {
  user: any = null;
  loading: boolean = false;
  prev: string = '';
  selfRecords: Record[] = [];
  follows: boolean = false;
  clickedFollowButton: boolean = false;
  pictureLoaded: boolean = false;

  routeSub: Subscription = null;
  authChangeSub: Subscription = null;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, public authService: AuthService, public navCtrl:NavController, private cloudService: CloudService) { }
  ngOnDestroy(): void {
    console.log('dest')
    this.routeSub.unsubscribe();
    this.authChangeSub.unsubscribe();
  }

  async ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.prev = params.prev;
      this.loading = true;
      this.selfRecords = [];
      console.log('init')

      this.authService.getUserById(params.uid).then(doc => {
        this.user = doc.data();
        this.user['uid'] = doc.id;

        this.selfRecords = this.cloudService.records.filter(record => {
          return record.user.uid == this.user.uid;
        });

        this.authChangeSub = this.authService.authChanged.subscribe(() => {
          if(this.authService.authUser.follows.length > 0) {
            for(let i=0;i<this.authService.authUser.follows.length;i++) {
              console.log('haloooo')
              if(this.authService.authUser.follows[i].uid == this.user.uid) {
                this.follows = true;
                break;
              }else{
                this.follows = false;
              }
            }
          }else{
            
          }
        });

        if(this.authService.authUser) {
          if(this.authService.authUser.follows.length > 0) {
            for(let i=0;i<this.authService.authUser.follows.length;i++) {
              console.log('haloooo')
              if(this.authService.authUser.follows[i].uid == this.user.uid) {
                this.follows = true;
                break;
              }else{
                this.follows = false;
              }
            }
          }else{
            
          }
        }

        this.loading = false;
      });
    });
  }

  back() {
    this.router.navigate([this.prev]);
  }

  openRecord(record: Record) {
    this.cloudService.setCurrentCloudRecod(record.id);
    this.router.navigate(['record-view']);
  }

  follow() {
    this.clickedFollowButton = true;
    this.userService.followUser(this.authService.authUser.uid, this.user.uid).then(res => {
      this.authService.refreshAuthUser();
      this.clickedFollowButton = false;
    }).catch(err => {
      this.clickedFollowButton = false;
      console.log(err);
    });
  }

  unfollow() {
    this.clickedFollowButton = true;
    this.userService.unfollowUser(this.authService.authUser, this.user.uid).then(res => {
      this.authService.refreshAuthUser();
      this.clickedFollowButton = false;
    }).catch(err => {
      this.clickedFollowButton = false;
      console.log(err);
    });
  }

  changeProfilePicture() {
    if(this.user.uid != this.authService.authUser.uid) {
      return;
    }

    let fileBrowser = document.getElementById('file-input-profile-pic');
    fileBrowser.click();

    fileBrowser.onchange = (event: any) => { 
      var file = event.target.files[0]; 
      if(file) {
        console.log(file);
        this.userService.updateProfilePicture(this.authService.authUser.uid, file).then(res => {
          //this.cloudService.fetchRecords();
          this.ngOnInit();
        });
      }
   }
  }

  picLoaded() {
    this.pictureLoaded = true;
  }

}
