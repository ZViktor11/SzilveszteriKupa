import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { map, Observable } from 'rxjs';
import { Csapat } from 'src/app/models/csapat';
import { Eredmeny } from 'src/app/models/eredmeny';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tabella',
  templateUrl: './tabella.page.html',
  styleUrls: ['./tabella.page.scss'],
})
export class TabellaPage implements OnInit {
  csapatok$: Observable<Csapat[]>;
  isLoggedIn$: Observable<boolean> | undefined;

  constructor(private dataService: DataService<Csapat>,private authService: AuthService,private alertCtrl: AlertController) {
    this.csapatok$=this.dataService.get('csapat');
   }

  ngOnInit() {
    this.isLoggedIn$=this.authService.currentUser().pipe(map(user=>!!user));
  }


  sortt(csapatok: Csapat[]){
    return csapatok.sort((a,b)=>{
      if(b.pont===a.pont){
        let bgk=(b.rugottGol-b.kapottGol);
        let agk=(a.rugottGol-a.kapottGol);
        if (bgk===agk){
          return b.rugottGol-a.rugottGol;
        }
        else if(bgk!=agk){
          return bgk-agk;
        }
        return b.rugottGol-a.rugottGol;
      }
      return b.pont-a.pont;
    });
  }

  asd(res: Csapat,csapat: Csapat,str: string): string{
    let visszater: any;
    switch(str){
      case 'gy':{
        if(res.gy===null){
          visszater=csapat.gy;
        }else{
          visszater=res.gy;
        }
        break;
      }
      case 'd':{
        if(res.d===null){
          visszater=csapat.d;
        }else{
          visszater=res.d;
        }
        break;
      }
      case 'v':{
        if(res.v===null){
          visszater=csapat.v;
        }else{
          visszater=res.v;
        }
        break;
      }
      case 'rg':{
        if(res.rugottGol===null){
          visszater=csapat.rugottGol;
        }else{
          visszater=res.rugottGol;
        }
        break;
      }
      case 'kg':{
        if(res.kapottGol===null){
          visszater=csapat.kapottGol;
        }else{
          visszater=res.kapottGol;
        }
        break;
      }
      case 'pont':{
        if(res.pont===null){
          visszater=csapat.pont;
        }else{
          visszater=res.pont;
        }
        break;
      }
    }
    return visszater as string;
  }

  vonal(i: number){
    if(i===2){
      return true;
    }else{
      return false;
    }
  }

  async update(csapat: Csapat){
    const alert=await this.alertCtrl.create({
      header:csapat.nev,
      inputs:[
        {
          name: 'gy',
          placeholder: 'Győzelem(' + csapat.gy + ')',
          type: 'number'
        },{
          name: 'd',
          placeholder: 'Döntetlen(' + csapat.d + ')',
          type: 'number'
        },{
          name: 'v',
          placeholder: 'Vereség(' + csapat.v + ')',
          type: 'number'
        },{
          name: 'rugottGol',
          placeholder: 'Rúgott gól(' + csapat.rugottGol + ')',
          type: 'number'
        },{
          name: 'kapottGol',
          placeholder: 'Kapott gól(' + csapat.kapottGol + ')',
          type: 'number'
        },{
          name: 'pont',
          placeholder: 'Pont(' + csapat.pont + ')',
          type: 'number'
        },
      ],
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Módosít',
          handler:(res)=>{
            this.dataService.update('csapat',csapat.id as string,{
              nev: csapat.nev,
              gy: parseInt(res.gy),
              d: parseInt(res.d),
              v: parseInt(res.v),
              rugottGol: parseInt(res.rugottGol),
              kapottGol: parseInt(res.kapottGol),
              pont: parseInt(res.pont)
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async add(){
    const alert=await this.alertCtrl.create({
      header:'Csapat hozzáadása',
      inputs:[
        {
          name: 'nev',
          placeholder: 'Csapatnév',
          type: 'text'
        }
      ],
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler:(res)=>{
            this.dataService.add('csapat',{
              nev: res.nev,
              gy: 0,
              d: 0,
              v: 0,
              rugottGol: 0,
              kapottGol: 0,
              pont: 0
            });
          }
        }
      ]
    });
    await alert.present();
  }

}
