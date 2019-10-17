import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/operators';

// the item model
import { GItem } from './models/g-item';

@Injectable({
  providedIn: 'root'
})
export class GItemService {
  // references to both the master list and the user list in firestore
  masterGroceryItemsCollection: AngularFirestoreCollection<GItem>;
  userGroceryItemsCollection: AngularFirestoreCollection<GItem>;

  // observables for both lists typed as GItem arrays
  masterGroceryItems$: Observable<GItem[]>;
  userrGroceryItems$: Observable<GItem[]>;


  constructor(db: AngularFirestore) { 
    this.masterGroceryItemsCollection = db.collection<GItem>('grocery').doc('masterList').collection('masterItems');
    this.masterGroceryItems$ = this.masterGroceryItemsCollection.valueChanges();

    this.userGroceryItemsCollection = db.collection<GItem>('grocery').doc('userList').collection('userItems');
    this.userrGroceryItems$ = this.userGroceryItemsCollection.valueChanges();
  }

  getMasterList() {
    
    const items$ = this.masterGroceryItems$
    .pipe(
      tap(() => console.log("http request made")),
      shareReplay()
    );
    return items$;
  }

  getUserList() {
    const items$ = this.userrGroceryItems$
    .pipe(
      tap(() => console.log("http request made")),
      shareReplay()
    );
    return items$;
  }
}
