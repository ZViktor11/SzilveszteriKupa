import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Eredmeny } from 'src/app/models/eredmeny';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-csapat',
  templateUrl: './csapat.page.html',
  styleUrls: ['./csapat.page.scss'],
})
export class CsapatPage implements OnInit {
  csapatnev: string;
  meccsek$: Observable<Eredmeny[]>;
  csapatM: Eredmeny[]=[];

  constructor(private activatedRoute: ActivatedRoute,private dataService: DataService<Eredmeny>) {
    this.csapatnev=this.activatedRoute.snapshot.paramMap.get('nev') as string;
    this.meccsek$=this.dataService.get('eredmeny');
  }

  ngOnInit() {
  }

  csapatMeccsei(meccsek: Eredmeny[]){
    this.csapatM=[];
    meccsek.forEach(element => {
      if(element.egyik===this.csapatnev || element.masik===this.csapatnev ){
        this.csapatM.push(element);
      }
    });
    return this.csapatM;
  }

  sortt(meccsek: Eredmeny[]){

    meccsek=this.csapatMeccsei(meccsek);

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

}
