import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { map, Observable } from 'rxjs';
import { Jatekos } from 'src/app/models/jatekos';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-gollovolista',
  templateUrl: './gollovolista.page.html',
  styleUrls: ['./gollovolista.page.scss'],
})
export class GollovolistaPage implements OnInit {
  jatekosok$: Observable<Jatekos[]>;
  isLoggedIn$: Observable<boolean> | undefined;
  helyezesValtozo: number=0;
  hely: number[]=[];


  constructor(private dataService: DataService<Jatekos>,private alertCtrl: AlertController,private authService: AuthService) {
    this.jatekosok$=this.dataService.get('jatekos');
  }

  ngOnInit() {
    this.isLoggedIn$=this.authService.currentUser().pipe(map(user=>!!user));
  }

  helyezes(index: number,jatekosok: Jatekos[]): any{
    if(index>0){
      let ez: number;
      ez=jatekosok[index].golokSzama;
      let az: number;
      az=jatekosok[index-1].golokSzama;

      if(ez==az){
        this.hely[index]=this.hely[index-1];
      }else{
        this.hely[index]=index+1;
      }
    }else{
      this.hely[index]=index+1;
    }

      return this.hely[index];
  }

   async update(jatekos: Jatekos){
    const alert=await this.alertCtrl.create({
      header:jatekos.nev,
      inputs:[
        {
          name: 'golokSzama',
          placeholder: 'Eddigi gólok: ' + jatekos.golokSzama,
          type: 'number'
        }
      ],
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Módosít',
          handler:(res)=>{
            this.dataService.update('jatekos',jatekos.id as string,{
              nev: jatekos.nev,
              csapat: jatekos.csapat,
              golokSzama: parseInt(res.golokSzama)
            });
          }
        }
      ]
    });
    await alert.present();
  }

  sortt(jatekosok: Jatekos[]){
    return jatekosok.sort(((a,b)=>{
      return b.golokSzama-a.golokSzama;
    }));
  }

  async add(){
    const alert=await this.alertCtrl.create({
      header:'Játékos hozzáadása',
      inputs:[
        {
          name: 'nev',
          placeholder: 'Név',
          type: 'text'
        },
        {
          name: 'csapat',
          placeholder: 'Csapatnév',
          type: 'text'
        },
        {
          name: 'golokSzama',
          placeholder: 'Gólok száma',
          type: 'number'
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
            this.dataService.add('jatekos',{
              nev: res.nev,
              csapat: res.csapat,
              golokSzama: res.golokSzama
            });
          }
        }
      ]
    });
    await alert.present();
  }

}
