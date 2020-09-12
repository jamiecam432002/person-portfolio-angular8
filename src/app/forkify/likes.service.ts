import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Like } from './models/like';
import { map } from 'rxjs/operators';
import { isPromiseAlike } from 'q';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  likesCollection$: AngularFirestoreCollection<Like>;
  likes$: Observable<Like[]> = null;
  currentRecipeLiked: Boolean;

  constructor(private db: AngularFirestore) { 
    this.likesCollection$ = this.db.collection('forkify-likes')
  }

  getLikes() {
    this.likes$ = this.likesCollection$.snapshotChanges().pipe(
      map(actions => actions.map(action => {
        const data = action.payload.doc.data() as Like;
        const id = action.payload.doc.id
        return {id, ...data};
      }))
    );
    this.likes$.subscribe();

    return this.likes$;
  }

  addLike(like, recipeId) {
    this.likesCollection$.doc(recipeId).set(like);
  }

  deleteLike(id) {
    const deletedItem = this.likesCollection$.doc<Like>(id).delete();
    return deletedItem;
  }

  async checkForLike(id) {
    console.log(`beginning check for whether recipe is liked in service on recipe ${id}`);
    const likeRef = this.db.collection('forkify-likes').doc(id).ref;
    
    

    this.currentRecipeLiked = await likeRef.get().then((docSnapshot) => {
      if(docSnapshot.exists) {
        this.currentRecipeLiked = true;
      }else{
        this.currentRecipeLiked = false;
      }
      return this.currentRecipeLiked;
      //console.log(isLiked);
    });

    return this.currentRecipeLiked;
  }
}
