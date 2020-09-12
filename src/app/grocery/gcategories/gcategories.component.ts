import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GItemService } from '../g-item.service';
import { GItem } from '../models/g-item';
import { SelectionModel } from '@angular/cdk/collections';
import { GeditCategoriesComponent } from './../gdialogs/gedit-categories/gedit-categories.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-gcategories',
  templateUrl: './gcategories.component.html',
  styleUrls: ['./gcategories.component.scss']
})
export class GcategoriesComponent implements OnInit, OnDestroy {

  categoriesSub;
  ldataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('lsort', { static: true }) lsort: MatSort;
  listDisplayedCols: string[] = ['selection', 'title'];

  selection = new SelectionModel<GItem>(true, []);

  constructor(private groceryService: GItemService, public dialog: MatDialog) { }

  ngOnInit() {
    this.reloadItems();
    
  }

  ngOnDestroy() {
    this.categoriesSub.unsubscribe();
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: GItem): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  deleteCategoriesFromList(categories) {
    this.groceryService.deleteCategoriesFromList(categories);
    this.resetSelection();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.ldataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.ldataSource.data.forEach(row => this.selection.select(row));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GeditCategoriesComponent, {
      width: '600px',
      data: this.ldataSource,
      maxWidth: '90%',
    });
  }

  reloadItems() {
    this.categoriesSub = this.groceryService.getCategoryList().subscribe(data => {
      this.ldataSource = new MatTableDataSource(data);
      this.ldataSource.paginator = this.paginator; 
      this.ldataSource.sort = this.lsort;
    });
  }

  resetSelection() {
    this.selection.clear();
  }

  trackByUid(index, item) {
    return item.uid
  }

}
