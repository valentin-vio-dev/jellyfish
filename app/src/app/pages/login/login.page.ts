import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  signIn() {
    if(this.email.trim() === '' || this.password.trim() === '') {
      this.missingFields();
      return;
    }

    this.loading = true;

    this.authService.signIn(this.email, this.password).then(res => {
      console.log(res.user.uid);
      this.authService.setAuthUser(res.user.uid);
      this.loading = false;
      this.router.navigate(['main/scan-tab'])
    }).catch(err => {
      this.invalidSignIn();
      this.loading = false;
      console.log(err)
    });
  }

  signUp() {
    this.router.navigate(['sign-up'])
  }

  async missingFields() {
    const alert = await this.alertController.create({
      header: 'Missing fields',
      message: 'Please fill all required fields!',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async invalidSignIn() {
    const alert = await this.alertController.create({
      header: 'Invalid email or password',
      message: 'Please check your email and password!',
      buttons: ['Ok']
    });

    await alert.present();
  }
}
