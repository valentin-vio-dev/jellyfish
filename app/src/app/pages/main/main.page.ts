import { Component, OnInit, OnDestroy } from '@angular/core';
import { CloudService } from 'src/app/services/cloud.service';
import { MenuController, NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, OnDestroy {
  menuNavSub: Subscription;

  constructor(private menuService: MenuService, public authService: AuthService, public cloudService: CloudService, private menu: MenuController, private router: Router, private menuCtrl: MenuController, private navCtrl: NavController) { }

  ngOnInit() {
    this.cloudService.fetchRecords();

    this.menuNavSub = this.menuService.getNavOpen().subscribe(res => {
      this.menu.open();
    });
  }

  ngOnDestroy() {
    this.menuNavSub.unsubscribe();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  ionViewWillLeave() {
    this.menu.close();
    this.menuCtrl.enable(false);
  }


  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  signOut() {
    this.authService.signOut();
  }

  toProfile() {
    this.router.navigate([`user/${this.authService.authUser.uid}/main`]);
  }

}
