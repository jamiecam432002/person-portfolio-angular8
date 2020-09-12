import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';

// the item model
import { GItem } from './models/g-item';

@Injectable({
  providedIn: 'root'
})
export class GItemService {
  // references to both the master list and the user list in firestore
  masterGroceryItemsCollection: AngularFirestoreCollection<GItem>;
  userGroceryItemsCollection: AngularFirestoreCollection<GItem>;
  categoryListCollection: AngularFirestoreCollection<any>;

  // observables for both lists typed as GItem arrays
  masterGroceryItems$: Observable<GItem[]>;
  userGroceryItems$: Observable<GItem[]>;

  constructor(public db: AngularFirestore) { 
    this.masterGroceryItemsCollection = db.collection<GItem>('grocery').doc('masterList').collection('masterItems');
    this.userGroceryItemsCollection = db.collection<GItem>('grocery').doc('userList').collection('userItems');
    this.categoryListCollection = db.collection('grocery').doc('categories').collection('categories');
  }

  addToCategories(data) {
    return this.categoryListCollection.add(data);
  }

  addToList(data): Observable<any> {
    // create batch
    let batch = this.db.firestore.batch();

    // loop through selection
    data.forEach(newitem => {
      const id = newitem.id;
      const collectionRef = this.userGroceryItemsCollection.doc(id).ref;
      batch.set(collectionRef,
        {
          title: newitem.title,
          category: newitem.category,
          quantity: newitem.defaultQty
        }
      );
    });

    return from(batch.commit());
  }

  addToMaster(data): Observable<any> {
    return from(this.masterGroceryItemsCollection.add(data));
  }

  deleteCategoriesFromList(items) {
    // create batch
    let batch = this.db.firestore.batch();

    // loop through the items selected
    items.forEach(item => {
      const id = item.id;
      const collectionRef = this.categoryListCollection.doc(id).ref;
      batch.delete(collectionRef);
    });

    // commit batch

    const batch$ = of(batch.commit());
    batch$.subscribe();
  }

  deleteFromList(items): Observable<any> {
    // create batch
    let batch = this.db.firestore.batch();

    // loop through the items selected
    items.forEach(item => {
      const id = item.id;
      const collectionRef = this.userGroceryItemsCollection.doc(id).ref;
      batch.delete(collectionRef);
    });

    // commit batch

    const batch$ = of(batch.commit());
    return batch$;
  }

  deleteFromMasterList(items): Observable<any> {
    // create batch
    let batch = this.db.firestore.batch();

    // loop through the items selected
    items.forEach(item => {
      const id = item.id;
      const collectionRef = this.masterGroceryItemsCollection.doc(id).ref;
      batch.delete(collectionRef);
    });

    // commit batch

    const batch$ = of(batch.commit());
    return batch$;
  }

  getCategoryList() {
    return this.db.collection<any>('grocery').doc('categories').collection('categories', ref => ref.orderBy('title'))
      .snapshotChanges()
      .pipe(
        map(snaps => {
          return snaps.map(snap => {
            return {
              id: snap.payload.doc.id,
              ...snap.payload.doc.data()
            };
          });
        })
      )
  }

  getMasterList() {
    return this.db.collection<GItem>('grocery').doc('masterList').collection('masterItems', ref => ref.orderBy('category').orderBy('title'))
      .snapshotChanges()
      .pipe(
        map(snaps => {
          return snaps.map(snap => {
            return {
              id: snap.payload.doc.id,
              ...snap.payload.doc.data()
            };
          });
        })
      );
  }

  getUserList() {
    return this.db.collection<GItem>('grocery').doc('userList').collection('userItems', ref => ref.orderBy('category').orderBy('title'))
      .snapshotChanges()
      .pipe(
        map(snaps => {
          return snaps.map(snap => {
            return {
              id: snap.payload.doc.id,
              ...snap.payload.doc.data()
            };
          });
        })
      );
  }

  saveItem(itemId: string, changes: Partial<GItem>): Observable<any> {
    return from(this.userGroceryItemsCollection.doc(itemId).update(changes));
  }

  saveMasterItem(itemId: string, changes: Partial<GItem>): Observable<any> {
    return from(this.masterGroceryItemsCollection.doc(itemId).update(changes));
  }


  

  
  
}
