import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GItemService } from '../../g-item.service';
import { GItem } from '../../models/g-item';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-gedit-list-item',
  templateUrl: './gedit-list-item.component.html',
  styleUrls: ['./gedit-list-item.component.scss']
})
export class GeditListItemComponent implements OnInit {

  categories = [];
  editListItemForm: FormGroup;
  item: GItem;

  constructor(
    private fb: FormBuilder,
    private groceryService: GItemService,
    public dialogRef: MatDialogRef<GeditListItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.item = data;
        console.log(data);

        this.editListItemForm = fb.group({
          title: [data.title],
          category: [data.category],
          quantity: [data.quantity]
        });

        this.groceryService.getCategoryList().subscribe(data => {
          this.categories = data;
        });
    }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  saveItem() {
    const changes = this.editListItemForm.value;

    this.groceryService.saveItem(this.item.id, changes)
      .subscribe(
        () => this.dialogRef.close(this.editListItemForm.value)
      );
  }

}
