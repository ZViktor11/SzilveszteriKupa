import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { addListener } from 'process';
import { map, Observable } from 'rxjs';
import { Csapat } from 'src/app/models/csapat';
import { Eredmeny } from 'src/app/models/eredmeny';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-eredmenyek',
  templateUrl: './eredmenyek.page.html',
  styleUrls: ['./eredmenyek.page.scss'],
})
export class EredmenyekPage implements OnInit {
  isLoggedIn$: Observable<boolean> | undefined;
  meccsek$: Observable<Eredmeny[]>;
  napValtozo: number=27;
  hazai$: Observable<Csapat[]>;
  hazai: Csapat;
  vendeg: Observable<Csapat[]> | undefined;


  constructor(private dataServiceEredmeny: DataService<Eredmeny>,private dataServiceCsapat: DataService<Csapat>,private alertCtrl: AlertController,private authService: AuthService) {
    this.meccsek$=this.dataServiceEredmeny.get('eredmeny');
    this.hazai$=this.dataServiceCsapat.get('csapat');
    this.hazai={
      nev:'',
      gy:0,
      d:0,
      v:0,
      rugottGol:0,
      kapottGol:0,
      pont:0,
    }
  }

  ngOnInit() {
    this.isLoggedIn$=this.authService.currentUser().pipe(map(user=>!!user));
  }


  napAtvalt(atvalt: string){
    if(atvalt==='kedd'){
      this.napValtozo=27;
    }
    else if(atvalt==='szerda'){
      this.napValtozo=28;
    }
    else if(atvalt==='csutortok'){
      this.napValtozo=29;
    }
    else if(atvalt==='pentek'){
      this.napValtozo=30;
    }

  }

  napMeccsei(meccsek: Eredmeny[],napValtozo:number){
    let maiMeccsek: Eredmeny[]=[];
    meccsek.forEach(element => {
      let mccsk=element.idopont.split('.');
      if(parseInt(mccsk[0])===napValtozo){
        maiMeccsek.push(element);
      }
    });
    return maiMeccsek;
  }

  parseIntt(str: string){
    return parseInt(str);
  }

  sortt(meccsek: Eredmeny[]){

    meccsek=this.napMeccsei(meccsek,this.napValtozo);

    return meccsek.sort((a,b)=>{
      let aNap,aOra,aPerc,bNap,bOra,bPerc;
      let aStr=a.idopont;
      let asplitDot = aStr.split(".");
      let asplitColon= asplitDot[1].split(":");
      aNap=parseInt(asplitDot[0]);
      aOra=parseInt(asplitColon[0]);
      aPerc=parseInt(asplitColon[1]);
      let bStr=b.idopont;
      let bsplitDot = bStr.split(".");
      let bsplitColon= bsplitDot[1].split(":");
      bNap=parseInt(bsplitDot[0]);
      bOra=parseInt(bsplitColon[0]);
      bPerc=parseInt(bsplitColon[1]);

      if(bNap===aNap){
        if(bOra===aOra){
          return aPerc-bPerc;
        }else{
          return aOra-bOra;
        }
      }else{
        return aNap-bNap;
      }
    });
  }



  async update(meccs: Eredmeny){
    const alert=await this.alertCtrl.create({
      header:'Mérkőzés módosítása',
      inputs:[
        {
          name: 'egyikGol',
          placeholder: 'Hazai gól',
          type: 'number'
        },
        {
          name: 'masikGol',
          placeholder: 'Vendég gól',
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
            this.dataServiceEredmeny.update('eredmeny',meccs.id as string,{
              egyik: meccs.egyik,
              masik: meccs.masik,
              egyikGol: res.egyikGol,
              masikGol: res.masikGol,
              idopont: meccs.idopont
            });
            this.hazai$.subscribe(ref=>{
              ref.forEach(element=>{
                if(element.nev===meccs.egyik){
                  this.hazai=element;
                }
              });
            });
            console.log(this.hazai);
            /* this.hazai=this.dataServiceCsapat.getTeamByName('csapat',meccs.egyik);
            this.vendeg=this.dataServiceCsapat.getTeamByName('csapat',meccs.masik); */
            if(res.egyikGol===res.masikGol){
              /* this.hazai.pont++;
              this.vendeg.pont++; */
              /* this.dataServiceCsapat.update('csapat',this.hazai.id as string,this.hazai);
              this.dataServiceCsapat.update('csapat',this.vendeg.id as string,this.vendeg); */
            }
            else if(res.egyikGol>res.masikGol){
             /*  this.hazai.pont+=3; */
              /* this.dataServiceCsapat.update('csapat',this.hazai.id as string,this.hazai); */
            }
            else if(res.egyikGol<res.masikGol){
             /*  this.vendeg.pont+=3; */

              /* this.dataServiceCsapat.update('csapat',this.vendeg.id as string,this.vendeg); */
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async add(){
    const alert=await this.alertCtrl.create({
      header:'Mérkőzés hozzáadása',
      inputs:[
        {
          name: 'egyik',
          placeholder: 'Hazai',
          type: 'text'
        },
        {
          name: 'masik',
          placeholder: 'Vendég',
          type: 'text'
        },
        {
          name: 'nap',
          placeholder: 'Nap',
          type: 'text'
        },
        {
          name: 'ora',
          placeholder: 'Óra',
          type: 'text'
        },
        {
          name: 'perc',
          placeholder: 'Perc',
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
            this.dataServiceEredmeny.add('eredmeny',{
              egyik: res.egyik,
              masik: res.masik,
              egyikGol: '-',
              masikGol: '-',
              idopont: res.nap + '. ' + res.ora + ':' + res.perc
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
