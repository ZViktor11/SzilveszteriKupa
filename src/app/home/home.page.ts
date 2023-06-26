import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  isLoggedIn$: Observable<boolean> | undefined;

  constructor(private router: Router,private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn$=this.authService.currentUser().pipe(map(user=>!!user));
  }

  logOut(){
    this.authService.logOut();
    this.router.navigateByUrl('login');
  }

}
