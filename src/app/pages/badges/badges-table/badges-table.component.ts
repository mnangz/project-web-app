import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BadgeService } from 'app/services/badge.service';
import { BadgesTableDataSource, BadgesTableItem } from './badges-table-datasource';
import { MatTableFilter } from 'mat-table-filter';
import { CustomExporter } from './custom-exporter';

export class BadgesTableItem2 {
  employee_id: string;
  expiresAt: number;
}

@Component({
  selector: 'badges-table',
  templateUrl: './badges-table.component.html',
  styleUrls: ['./badges-table.component.css']
})
export class BadgesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<BadgesTableItem>;
  BADGES_DATA : BadgesTableItem[];
  dataSource = new MatTableDataSource<BadgesTableItem>(this.BADGES_DATA);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['employee_id', 'expiresAt'];

  filterEntity: BadgesTableItem;
  filterType: MatTableFilter;

  customExporter: CustomExporter;

  constructor(public bService: BadgeService){}

  ngOnInit() {
    this.filterEntity = new BadgesTableItem2();
    this.filterType = MatTableFilter.ANYWHERE;

    this.getAllBadges();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  async getAllBadges() {
    await this.bService.getAllBadges()
      .subscribe(res => this.dataSource.data=res as BadgesTableItem[]);
  }
}
