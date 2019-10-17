import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/operators';


// the item model
import { FItem } from './fitem';


@Injectable({
  providedIn: 'root'
})
export class FItemService {

  private basePath: string = '/budget';
  
  itemsCollection: AngularFirestoreCollection<FItem>;
  items$: Observable<FItem[]> = null;

  itemRef: AngularFirestoreDocument<FItem>;
  item$: Observable<FItem> = null;


  constructor(private db: AngularFirestore) { 
    this.itemsCollection = db.collection<FItem>(this.basePath);
    
  }

  getItems(): Observable<FItem[]> {
    /*const items$ = this.items$
    .pipe(
      tap(() => console.log("http request made")),
      shareReplay()
    );
    items$.subscribe(data => {
      console.log(data);
    })*/
    //this.itemsCollection = this.db.collection<FItem>(this.basePath);
    this.items$ = this.itemsCollection.snapshotChanges().pipe(
      tap(() => console.log("http request made")),
      map(actions => actions.map(action => {
        const data = action.payload.doc.data() as FItem;
        const id = action.payload.doc.id;
        return { id, ...data };
      })),
      shareReplay()
    );
    return this.items$;
    
  }

  getItem(key: string): Observable<any> {
    this.itemRef = this.db.collection(this.basePath).doc(key);
    this.item$ = this.itemRef.valueChanges();
    return this.item$;
  }

  addItem(item: FItem) {
    this.itemsCollection.add(item)
    .then(docRef => {
      console.log(`Document written with ID: ${docRef.id}`);
      return docRef.id;
    })
    .then(id => {
      this.itemsCollection.doc(id).update({
        id: id
      })
    })
    .catch(error => console.log(`Error adding document: ${error}`));
  }

  deleteItem(item: FItem) {
    let itemID = item.id;
    console.log(itemID);
    this.itemsCollection.doc(itemID).delete();
  }

  updateItem(id, docData) {
    this.itemsCollection.doc(id).set(docData, { merge: true})
      .then(() => {
        console.log('document successfully written');
      });
  }

}
