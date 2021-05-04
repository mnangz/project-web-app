import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { QuestionnaireService } from 'app/services/questionnaire.service';
import { QuestionnairesTableDataSource, QuestionnairesTableItem } from './questionnaires-table-datasource';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableFilter } from 'mat-table-filter';
import { CustomExporter } from './custom-exporter';

export class QuestionnairesTableItem2 {
  _id: string;
  approved: string;
  employee_id: string;
  temperature: number;
  location: string;
  fourteen_days: string;
  leave: boolean;
  travel: string;
  business: boolean;
  contact: string;
  tested: string;
  testType: string;
  result: string;
  verifiedby: string;
  verificationDate: Date;
  hotBody: string;
  headache: string;
  weak: string;
  bodyPains: string;
  nausea: string;
  vomiting: string;
  soreThroat: string;
  cough: string;
  nose: string;
  chestPains: string;
  breathing: string;
  duration: string;
}

@Component({
  selector: 'questionnaires-table',
  templateUrl: './questionnaires-table.component.html',
  styleUrls: ['./questionnaires-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class QuestionnairesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<QuestionnairesTableItem>;
  QUESTIONNAIRES_DATA : QuestionnairesTableItem[];
  dataSource = new MatTableDataSource<QuestionnairesTableItem>(this.QUESTIONNAIRES_DATA);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['approved', 'employee_id', 'location', 'fourteen_days', 'leave', 'travel', 'business', 'contact', 'tested', 'testType', 'result', 'verifiedby', 'verificationDate', 'hotBody', 'headache', 'weak', 'bodyPains', 'nausea', 'vomiting', 'soreThroat', 'cough', 'nose', 'chestPains', 'breathing', 'duration'];
  expandedElement: QuestionnairesTableItem | null;

  filterEntity: QuestionnairesTableItem;
  filterType: MatTableFilter;

  customExporter: CustomExporter;

  constructor(public qService: QuestionnaireService){}

  ngOnInit() {
    this.filterEntity = new QuestionnairesTableItem2();
    this.filterType = MatTableFilter.ANYWHERE;

    this.getQuestionnaires();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  async getQuestionnaires(){
    await this.qService.getAllQuestionnaires()
      .subscribe(res => this.dataSource.data=res as QuestionnairesTableItem[]);
  }
}
