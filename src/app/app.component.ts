// https://stackblitz.com/edit/angular-mat-table-checkbox-filter-dgs45x?file=app%2Ftable-overview-example.ts
// https://cloudtables.com/
// https://stackblitz.com/edit/angular-bklajw-tou55l?file=app%2Ftable-basic-example.html

// https://stackblitz.com/edit/angular-hbakxo-5jeaic?file=app%2Ftable-filtering-example.ts

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon',
  'red',
  'orange',
  'yellow',
  'blue',
  'navy',
  'black',
  'gray',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Oliver',
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<UserData>;
  filterValues: any = {};
  blueColor!: boolean;
  firstName!: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor() {
    // Create 1000 users
    const users = Array.from({ length: 1000 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    /*this.dataSource.filterPredicate = (
      data: UserData,
      filter: string
    ): boolean => {
      const filterValues = JSON.parse(filter);

      return (
        (this.blueColor
          ? data.color.trim().toLowerCase() === filterValues.color
          : true) &&
        (this.firstName
          ? data.name.trim().toLowerCase().indexOf(filterValues.name) !== -1
          : true)
      );
    };*/
    /*    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;*/
  }
  /* applyFilter(column: string, filterValue: string) {
    this.filterValues[column] = filterValue;

    this.dataSource.filter = JSON.stringify(this.filterValues);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }*/

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
  };
}
