import { Component, OnInit, ViewChild, Output, OnDestroy } from '@angular/core';
import { GeditMasterComponent } from '../../gdialogs/gedit-master/gedit-master.component';
import { GeditMasterItemComponent } from '../../gdialogs/gedit-master-item/gedit-master-item.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { GItemService } from '../../g-item.service';
import { GItem } from '../../models/g-item';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'gmlist',
  templateUrl: './gmlist.component.html',
  styleUrls: ['./gmlist.component.scss']
})
export class GmlistComponent implements OnInit, OnDestroy {

  categories = [];
  selectedFilter;
  masterListSub;
  mldataSource: MatTableDataSource<any>;
  mlistDisplayedCols: string[] = ['select', 'title', 'defaultQty', 'category'];
  selection = new SelectionModel<GItem>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('msort', { static: true }) msort: MatSort;

  constructor(private groceryService: GItemService, public dialog: MatDialog) { 
    this.groceryService.getCategoryList().subscribe(data => {
      this.categories = data;
    })
  }

  ngOnInit() {
    this.reloadItems();
  }

  ngOnDestroy() {
    this.masterListSub.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.mldataSource.filter = filterValue.trim().toLowerCase();

    if (this.mldataSource.paginator) {
      this.mldataSource.paginator.firstPage();
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: GItem): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  deleteItemsFromList(items) {
    this.groceryService.deleteFromMasterList(items).subscribe(data => {
      this.selectedFilter = "All";
    });
    this.resetSelection();
  }

  editMasterItem(event, item) {
    event.stopPropagation();
    console.log(item);
    const editDialogRef = this.dialog.open(GeditMasterItemComponent, {
      width: '600px',
      maxWidth: '90%',
      data: item
    }).afterClosed().subscribe(data => {
      this.selectedFilter = "All";
    })
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

  openDialog(data): void {
    const dialogRef = this.dialog.open(GeditMasterComponent, {
      width: '600px',
      maxWidth: '90%',
      data: data
    }).afterClosed().subscribe(data => {
      this.selectedFilter = "All";
    })
  }
  
  onSelectionChanged(e) {
    if(e.value == "All") {
      this.applyFilter("");
    }else {
      this.applyFilter(e.value);
    }
  }

  reloadItems() {
    this.masterListSub = this.groceryService.getMasterList().subscribe(data => {
      this.mldataSource = new MatTableDataSource(data);
      this.mldataSource.paginator = this.paginator; 
      this.mldataSource.sort = this.msort;
    });
    this.selectedFilter = "All";
  }

  resetSelection() {
    this.selection.clear();
  }

  trackByUid(index, item) {
    return item.uid
  }

  
}
