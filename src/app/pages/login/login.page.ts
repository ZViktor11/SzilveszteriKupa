import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  /* form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  }); */
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required])
  });

  alertMessage="";

  @HostListener('document:keydown.enter') onKeydownHandler() {
    this.login();
  }


  constructor(private router: Router,private authService: AuthService,private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.authService.logOut();
  }

  navTo(url: string): void{
    this.router.navigateByUrl(url);
  }

  login(): void{
    if (this.form.invalid) {
      return;
    }
    this.authService.logIn(this.form.value.email, this.form.value.password).then(
      result => {
        console.log(result);
        this.navTo('/home');
      },
      (error) => {
        this.alertMessage = "Hiba";
      }
    );
  }

}
