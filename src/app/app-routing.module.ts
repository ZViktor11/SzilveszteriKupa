import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'tabella',
    pathMatch: 'full'
  },
  {
    path: 'home',
    /* loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) */
    loadChildren: () => import('./pages/tabella/tabella.module').then( m => m.TabellaPageModule)
  },
  {
    path: 'tabella',
    loadChildren: () => import('./pages/tabella/tabella.module').then( m => m.TabellaPageModule)
  },
  {
    path: 'eredmenyek',
    loadChildren: () => import('./pages/eredmenyek/eredmenyek.module').then( m => m.EredmenyekPageModule)
  },
  {
    path: 'gollovolista',
    loadChildren: () => import('./pages/gollovolista/gollovolista.module').then( m => m.GollovolistaPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'navbar',
    loadChildren: () => import('./pages/navbar/navbar.module').then( m => m.NavbarPageModule)
  },
  {
    path: 'tabella/:nev',
    loadChildren: () => import('./pages/csapat/csapat.module').then( m => m.CsapatPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/tabella/tabella.module').then( m => m.TabellaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
