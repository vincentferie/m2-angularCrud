import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  /** Columns displayed in the table. Columns can be added, removed, or reordered. */
  displayedColumns: string[] = [
    'nom',
    'categorie',
    'etat',
    'prix',
    'comment',
    'date',
    'action',
  ];
  /* Table */
  dataSource!: MatTableDataSource<any>;

  /* Paginator */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  /* OPEN the dialog mat. for add product */
  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllProducts();
        }
      });
  }

  /* GET all products from the database */
  getAllProducts() {
    this.api.getProduct().subscribe({
      /* If the request is successful */
      next: (res) => {
        /* Assign the data to the data source for the table to render */
        this.dataSource = new MatTableDataSource(res);
        /* Pagination */
        this.dataSource.paginator = this.paginator;
        /* Sort */
        this.dataSource.sort = this.sort;
      },
      /* If the request fails */
      error: (err) => {
        /* Log the error */
        alert('Erreur lors de la récupération des données');
      },
    });
  }

  /* EDIT a product from the database */
  editProduct(row: any) {
    /* Open the dialog mat. for edit product */
    this.dialog.open(DialogComponent, {
        width: '30%',
        data: row,
    }).afterClosed()
    /* If the dialog mat. is closed */
      .subscribe((val) => {
        /* If the value is 'update' */
        if (val === 'update') {
          /* Return on table which contains all products */
          this.getAllProducts();
        }
      });
  }


  /* DELETE a product from the database */
  deleteProduct(id:number){
    /* Open a dialog mat. for confirmation */
    this.api.deleteProduct(id)
    /* If the request is successful */
    .subscribe({
      next:(res)=>{
        /* Return on table which contains all products */
        alert("Produit supprimé avec succès");
        this.getAllProducts();
      },
      error:()=>{
        alert('Erreur lors de la suppression du produit!!');
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
