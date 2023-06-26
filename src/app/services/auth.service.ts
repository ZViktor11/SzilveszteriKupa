import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth) { }

  async logOut(): Promise<void>{
      await this.afauth.signOut();
  }

  logIn(email: string, password: string): Promise<any>{
    return this.afauth.signInWithEmailAndPassword(email,password);
  }

  currentUser(): any{
    return this.afauth.authState;
  }

  authenticated(): Observable<boolean>{
    return (this.afauth.authState !== null) as any;
  }
}
