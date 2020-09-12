import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GItemService } from '../../g-item.service';
import { GItem } from '../../models/g-item';
import { SelectionModel } from '@angular/cdk/collections';
import { GaddFromMasterComponent } from './../../gdialogs/gadd-from-master/gadd-from-master.component';
import { GeditListItemComponent } from '../../gdialogs/gedit-list-item/gedit-list-item.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material'; 

@Component({
  selector: 'glist',
  templateUrl: './glist.component.html',
  styleUrls: ['./glist.component.scss']
})
export class GlistComponent implements OnInit, OnDestroy {
  categories = [];
  userListSub;
  masterListSub;
  categoriesSub;
  selectedFilter;


  ldataSource: MatTableDataSource<any>;
  mldataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('lsort', { static: true }) lsort: MatSort;
  listDisplayedCols: string[] = ['selection', 'title', 'qty', 'category'];
  selection = new SelectionModel<GItem>(true, []);

  constructor(private groceryService: GItemService, public dialog: MatDialog) {
  }
  ngOnInit() {
    this.reloadItems();
  }
  ngOnDestroy() {
    this.userListSub.unsubscribe();
    this.masterListSub.unsubscribe();
    this.categoriesSub.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.ldataSource.filter = filterValue.trim().toLowerCase();

    if (this.ldataSource.paginator) {
      this.ldataSource.paginator.firstPage();
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
    this.groceryService.deleteFromList(items).subscribe(data => {
      this.selectedFilter = "All";
    });
    this.resetSelection();
  }

  editListItem(event, item) {
    event.stopPropagation();
    console.log(item);
    const editDialogRef = this.dialog.open(GeditListItemComponent, {
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
    const dialogRef = this.dialog.open(GaddFromMasterComponent, {
      width: '600px',
      data: this.mldataSource,
      maxWidth: '90%',
    }).afterClosed().subscribe(data => {
      this.selectedFilter = "All";
    })
    
  }

  onSelectionChanged(e) {
    console.log("selection has changed");
    if (e.value == "All") {
      this.applyFilter("");
    } else {
      this.applyFilter(e.value);
    }

  }

  reloadItems() {
    this.userListSub = this.groceryService.getUserList().subscribe(data => {
      
      this.ldataSource = new MatTableDataSource(data);
      this.ldataSource.paginator = this.paginator; 
      this.ldataSource.sort = this.lsort;
    });
    this.masterListSub = this.groceryService.getMasterList().subscribe(data => {
      this.mldataSource = new MatTableDataSource(data);
    });
    this.categoriesSub = this.groceryService.getCategoryList().subscribe(data => {
      console.log(data);
      this.categories = data;
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
