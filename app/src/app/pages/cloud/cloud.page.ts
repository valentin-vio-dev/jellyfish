import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CloudService } from 'src/app/services/cloud.service';
import { Record } from 'src/models/Record';
import { MenuService } from 'src/app/services/menu.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.page.html',
  styleUrls: ['./cloud.page.scss'],
})
export class CloudPage implements OnInit {
  currentSegment: string = 'all';
  records: Record[] = [];
  allCount: number = 0;
  personalCount: number = 0;
  libCount: number = 0;

  constructor(private alertController: AlertController, private router: Router, public cloudService: CloudService, private route: ActivatedRoute, private menu: MenuService, private authService: AuthService) { }

  ngOnInit() {
    this.records = this.cloudService.records;
    
    this.route.params.subscribe(params => {
      if(params.refresh == 'true') {
        this.cloudService.fetchRecords();
      }
    });

    this.cloudService.fetchComplete.subscribe(() => {
      this.records = this.cloudService.records;
      console.log(this.records)
    });
  }

  async refresh(event) {
    this.cloudService.fetchRecords();
    event.target.complete();
  }

  openRecord(record: Record) {
    this.cloudService.setCurrentCloudRecod(record.id);
    this.router.navigate(['record-view']);
  }

  openNav() {
    this.menu.openNav();
  }

  segmentChanged(event) {
    this.currentSegment = event.detail.value;
  }

  getAllRecords() {
    let all = this.records.filter(record => {
      return record.isPrivate == false && record.user.uid != this.authService.authUser.uid;
    });
    this.allCount = all.length;
    return all;
  }

  getPersonalRecords() {
    let personal = this.records.filter(record => {
      return (record.user.uid == this.authService.authUser.uid && record.isPrivate) || (record.user.uid == this.authService.authUser.uid && !record.isPrivate);
    });
    this.personalCount = personal.length;
    return personal;
  }

  getLibRecords() {
    let lib = [];
    if(this.authService.authUser && this.authService.authUser.libs) {
      for(let i=0;i<this.records.length;i++) {
        for(let j=0;j<this.authService.authUser.libs.length;j++) {
          if(this.authService.authUser.libs[j].recId == this.records[i].id && !this.records[i].isPrivate) {
            lib.push(this.records[i]);
          }
        }
      }
    }
    this.libCount = lib.length;
    return lib;
  }

  async deleteRecord(record: Record) {
    const alert = await this.alertController.create({
      header: 'Delete record',
      message: 'Are you sure to delete this record?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Yes, delete',
          handler: () => {
            this.cloudService.deleteRecord(record).then(() => {
              this.cloudService.fetchRecords();
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
