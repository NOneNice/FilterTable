import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from '../app.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, AfterViewInit {
  @Input() dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  progressFilter = new FormControl();
  nameFilter = new FormControl();
  globalFilter = '';

  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  filteredValue = {
    id: '',
    name: '',
    progress: '',
    color: '',
  };

  constructor() {}

  ngOnInit(): void {
    /*    this.progressFilter.valueChanges.subscribe((progressFilterValue) => {
      this.filteredValue['progress'] = progressFilterValue;
      this.dataSource.filter = this.filteredValue.progress;
    });

    this.nameFilter.valueChanges.subscribe((nameFilerValue) => {
      this.filteredValue['name'] = nameFilerValue;
      this.dataSource.filter = this.filteredValue.name;
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();

    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;*/
  }

  ngAfterViewInit() {
    this.progressFilter.valueChanges.subscribe((progressFilterValue) => {
      this.filteredValue['progress'] = progressFilterValue;
      this.dataSource.filter = this.filteredValue.progress;
    });

    this.nameFilter.valueChanges.subscribe((nameFilerValue) => {
      this.filteredValue['name'] = nameFilerValue;
      this.dataSource.filter = this.filteredValue.name;
    });

    //this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  applyFilter(filter: any) {
    /*    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();*/
    this.globalFilter = filter;
    this.dataSource.filter = this.globalFilter.toString();
  }

  /*customFilterPredicate() {
    return (data: UserData, filter: string): boolean => {
      let globalMatch = this.globalFilter;

      if (globalMatch) {
        // search all text fields
        globalMatch =
          data.name
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      let searchString = JSON.parse(filter);
      return (
        data.progress.toString().trim().indexOf(searchString.progress) !== -1 &&
        data.name
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.name.toLowerCase()) !== -1
      );
    };
  }*/

  /* createFilter() {
    return function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col]
              .trim()
              .toLowerCase()
              .split(' ')
              .forEach((word: string) => {
                if (
                  data[col].toString().toLowerCase().indexOf(word) != -1 &&
                  isFilterSet
                ) {
                  found = true;
                }
              });
          }
          return found;
        } else {
          return true;
        }
      };
      return nameSearch();
    };
  }*/
}
