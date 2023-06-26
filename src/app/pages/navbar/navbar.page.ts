import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map,Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.scss'],
})
export class NavbarPage implements OnInit {
  isLoggedIn$: Observable<boolean> | undefined;

  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$=this.authService.currentUser().pipe(map(user=>!!user));
  }

  logOut(){
    this.authService.logOut();
    this.router.navigateByUrl('login');
  }

}
