import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GItemService } from '../../g-item.service';
import { GItem } from '../../models/g-item';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-gedit-master-item',
  templateUrl: './gedit-master-item.component.html',
  styleUrls: ['./gedit-master-item.component.scss']
})
export class GeditMasterItemComponent implements OnInit {

  categories = [];
  editMasterItemForm: FormGroup;
  item: GItem;

  constructor(
    private fb: FormBuilder,
    private groceryService: GItemService,
    public dialogRef: MatDialogRef<GeditMasterItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.item = data;

      this.editMasterItemForm = fb.group({
        title: [data.title],
        category: [data.category],
        defaultQty: [data.defaultQty]
      });

      this.groceryService.getCategoryList().subscribe(data => {
        this.categories = data;
      });
     
    }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  saveItem(){
    const changes = this.editMasterItemForm.value;
    this.groceryService.saveMasterItem(this.item.id, changes)
      .subscribe(
        () => this.dialogRef.close(this.editMasterItemForm.value)
      );
  }

  

}
