import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ingredient } from './models/ingredient';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  itemsCollection: AngularFirestoreCollection<Ingredient>;
  items$: Observable<Ingredient[]> = null;  

  constructor(private db: AngularFirestore) { 
    this.itemsCollection = db.collection<Ingredient>("forkify");
  }

  getList() {
    this.items$ = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(action => {
        const data = action.payload.doc.data() as Ingredient;
        const id = action.payload.doc.id;
        return { id, ...data };
      })),
    );
    this.items$.subscribe();
    return this.items$;
  }

  addItems(ingredientArr) {
    // create batch
    let batch = this.db.firestore.batch();

    // loop through ingredients and create documents
    ingredientArr.forEach(ing => {
      const id = this.db.createId();
      const collectionRef = this.itemsCollection.doc<Ingredient>(id).ref;
      batch.set(collectionRef, ing);

    });

    // commit batch
    batch.commit();
  }

  deleteItem(id) {
    const deletedItem = this.itemsCollection.doc<Ingredient>(id).delete();
    return deletedItem;
  }

  clearList(list) {
    let batch = this.db.firestore.batch();
    //console.log("attempting to clear list from service");
    //console.log(list);
    list.forEach(item => {
      const collectionRef = this.itemsCollection.doc<Ingredient>(item.id).ref;
      batch.delete(collectionRef);
      //console.log(item);
    });
    batch.commit();
  }
}
