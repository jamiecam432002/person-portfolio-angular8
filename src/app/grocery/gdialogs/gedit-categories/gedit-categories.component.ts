import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GItemService } from '../../g-item.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-gedit-categories',
  templateUrl: './gedit-categories.component.html',
  styleUrls: ['./gedit-categories.component.scss']
})
export class GeditCategoriesComponent implements OnInit {
  
  addMasterCategoryForm = new FormGroup({
    title: new FormControl(''),
  });

  constructor(
    private groceryService: GItemService,
    public dialogRef: MatDialogRef<GeditCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  addToCategories() {
    this.dialogRef.close();
    let formData = this.addMasterCategoryForm.value;
    this.groceryService.addToCategories(formData);
  }

  cancelAdd(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
