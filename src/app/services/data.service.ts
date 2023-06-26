import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionReference, AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { Jatekos } from '../models/jatekos';
import { Csapat } from '../models/csapat';

@Injectable({
  providedIn: 'root'
})
export class DataService<T extends {id?: string}> {

  constructor(private firestore: AngularFirestore) { }

  get(collectionName: string): Observable<T[]> {
    return this.firestore.collection(collectionName).valueChanges() as Observable<T[]>;
  }

  async add(collectionName: string, data: T, id?: string): Promise<string> {
    const uid = id ? id : this.firestore.createId();
    data.id = uid;
    await this.firestore.collection(collectionName).doc(uid).set(data);
    return uid;
  }

  // tslint:disable-next-line: typedef
  weakAdd(collectionName: string, data: T) {
    return this.firestore.collection(collectionName).add(data).then(
      result => { console.log(result); }, err => { console.log(err); }).finally(() => { console.log('finally'); });
  }

  getById(collectionName: string, id: string): Observable<any> {
    return this.firestore.collection(collectionName).doc(id).valueChanges();
  }

  update(collectionName: string, id: string, data: T): Promise<void> {
    return this.firestore.collection(collectionName).doc(id).update(data).then(
      result => { console.log(result); }, err => { console.log(err); }).finally(() => { console.log('finally'); });
  }

  delete(collectionName: string, id: string): Promise<void> {
    return this.firestore.collection(collectionName).doc(id).delete();
  }

  getTeamByName(name: string) {
    return this.firestore.collection('csapat',ref=>ref.where('nev','==',name));
  }

  /* addPoint(id: string, data: Csapat){
    return this.firestore.collection('csapat').doc(id).update(data.pont).then(
      result => { console.log(result); }, err => { console.log(err); }).finally(() => { console.log('finally'); });
  } */

  /* getPlayer(){
    return this.firestore.collection<Jatekos>('jatekos').valueChanges();
  }

  addPlayer(jatekos: Jatekos){
    jatekos.id=this.firestore.createId();
    return this.firestore.collection<Jatekos>('jatekos').doc(jatekos.id).set(jatekos);
  }

  deletePlayer(id: string){
    return this.firestore.collection<Jatekos>('jatekos').doc(id).delete();
  }

  updatePlayer(jatekos: Jatekos){
    return this.firestore.collection<Jatekos>('jatekos').doc(jatekos.id).set(jatekos);
  } */

}
