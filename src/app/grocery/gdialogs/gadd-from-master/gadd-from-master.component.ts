import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GItemService } from '../../g-item.service';
import { SelectionModel } from '@angular/cdk/collections';
import { GItem } from '../../models/g-item';
import { MatTableDataSource, MatSort } from '@angular/material'; 

@Component({
  selector: 'app-gadd-from-master',
  templateUrl: './gadd-from-master.component.html',
  styleUrls: ['./gadd-from-master.component.scss']
})
export class GaddFromMasterComponent implements OnInit {

  mldataSource: MatTableDataSource<any>;
  @ViewChild('msort', { static: true }) msort: MatSort;
  mlistDisplayedCols: string[] = ['selection', 'title', 'category'];
  selection = new SelectionModel<GItem>(true, []);

  constructor(
    private groceryService: GItemService,
    public dialogRef: MatDialogRef<GaddFromMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
      this.mldataSource = data;
  }

  ngOnInit() {
    this.mldataSource.sort = this.msort;
  }

  addItemsToList() {
    const newitems = this.selection.selected;
    this.groceryService.addToList(newitems).subscribe(
      () => this.dialogRef.close(this.selection.selected)
    );
  }

  cancelAdd(): void {
    this.dialogRef.close();
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: GItem): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.mldataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.mldataSource.data.forEach(row => this.selection.select(row));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  trackByUid(index, item) {
    return item.uid
  }
}
