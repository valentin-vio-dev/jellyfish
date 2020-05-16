import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  role: string = '';
  password: string = '';
  password2: string = '';

  loading: boolean = false;

  constructor(private router: Router, private alertController: AlertController, private authService: AuthService, private toastController: ToastController) { }

  ngOnInit() {
  }

  backToLogin() {
    this.router.navigate(['login']);
  }

  signUp() {
    if(this.email.trim() === '' || this.password.trim() === '' || this.firstname.trim() === '' || this.lastname.trim() === '' || this.password2.trim() === '' || this.role.trim() === '') {
      this.missingFields();
      return;
    }

    if(this.password !== this.password2) {
      this.message('Password error', 'The passwords must match!');
      return;
    }

    this.loading = true;

    this.authService.signUp(this.email, this.password).then(res => {
      console.log('UID', res.user.uid);
      this.authService.signUpExtras(res.user.uid, this.firstname, this.lastname, this.role, this.email).then(resExtra => {
        this.loading = false;
        this.presentToast('Successful registration!', 2000);
        this.router.navigate(['login']);
        console.log('RESEXT' ,resExtra);
      }).catch(errExtra => {
        this.loading = false;
        console.log('EXTR', errExtra);
      });
    }).catch(err => {
      this.loading = false;
      console.log(err.code)
      switch(err.code) {
        case 'auth/invalid-email':
          this.message('Invalid email', 'Please type a valid email!');
          break;
        case 'auth/weak-password':
          this.message('Weak password', 'At least 6 character!');
          break;
        case 'auth/email-already-in-use':
          this.message('Email already in user', 'Please choose other email!');
          break;
      }
    });
  }

  async missingFields() {
    const alert = await this.alertController.create({
      header: 'Missing fields',
      message: 'Please fill all required fields!',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async message(header, text) {
    const alert = await this.alertController.create({
      header: header,
      message: text,
      buttons: ['Ok']
    });

    await alert.present();
  }

  async presentToast(message, time) {
    const toast = await this.toastController.create({
      message: message,
      duration: time
    });
    toast.present();
  }

}
