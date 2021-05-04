import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AccesslogService } from 'app/services/accesslog.service';
import { AccessLogTableDataSource, AccessLogTableItem } from './access-log-table-datasource';
import { MatTableFilter } from 'mat-table-filter';
import { CustomExporter } from './custom-exporter';

export class AccessLogTableItem2 {
  _id: string;
  employee_id: string;
  location: string;
  temperature: number;
  date: Date;
}

@Component({
  selector: 'access-log-table',
  templateUrl: './access-log-table.component.html',
  styleUrls: ['./access-log-table.component.css']
})
export class AccessLogTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AccessLogTableItem>;
  ACCESSLOG_DATA : AccessLogTableItem[];
  dataSource = new MatTableDataSource<AccessLogTableItem>(this.ACCESSLOG_DATA);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['employee_id', 'temperature', 'location', 'date'];

  filterEntity: AccessLogTableItem;
  filterType: MatTableFilter;

  customExporter: CustomExporter;

  constructor(public aService: AccesslogService){}

  ngOnInit() {
    this.filterEntity = new AccessLogTableItem2();
    this.filterType = MatTableFilter.ANYWHERE;

    this.getLogs();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  async getLogs() {
    await this.aService.getLogs()
      .subscribe(res => this.dataSource.data=res as AccessLogTableItem[]);
  }
}
