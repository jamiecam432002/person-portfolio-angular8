import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GItemService } from '../../g-item.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-gedit-master',
  templateUrl: './gedit-master.component.html',
  styleUrls: ['./gedit-master.component.scss']
})
export class GeditMasterComponent {

  categories = [];
  selectedCategory: string;

  addMasterItemForm = new FormGroup({
    title: new FormControl(''),
    category: new FormControl(),
    defaultQty: new FormControl(1)
  });

  constructor(private groceryService: GItemService,
    public dialogRef: MatDialogRef<GeditMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.selectedCategory = data;
      this.groceryService.getCategoryList().subscribe(data => {
        this.categories = data;
      });
      this.addMasterItemForm.controls['category'].setValue(this.selectedCategory, {onlySelf: true});
    }

  ngOnInit() {
  }

  addToMaster() {
    const formData = this.addMasterItemForm.value;
    this.groceryService.addToMaster(formData).subscribe(
      () => this.dialogRef.close(this.addMasterItemForm.value)
    );
  }

  close() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  

}
