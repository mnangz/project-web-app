import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface QuestionnairesTableItem {
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


/**
 * Data source for the QuestionnairesTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class QuestionnairesTableDataSource extends DataSource<QuestionnairesTableItem> {
  data: QuestionnairesTableItem[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<QuestionnairesTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: QuestionnairesTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: QuestionnairesTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'approved': return compare(a.approved, b.approved, isAsc);
        case 'employee_id': return compare(+a.employee_id, +b.employee_id, isAsc);
        case 'temperature': return compare(a.temperature, b.temperature, isAsc);
        case 'location': return compare(+a.location, +b.location, isAsc);
        case 'fourteen_days': return compare(a.fourteen_days, b.fourteen_days, isAsc);
        case 'leave': return compare(+a.leave, +b.leave, isAsc);
        case 'travel': return compare(a.travel, b.travel, isAsc);
        case 'business': return compare(+a.business, +b.business, isAsc);
        case 'contact': return compare(a.contact, b.contact, isAsc);
        case 'tested': return compare(+a.tested, +b.tested, isAsc);
        case 'testType': return compare(a.testType, b.testType, isAsc);
        case 'result': return compare(+a.result, +b.result, isAsc);
        case 'verifiedby': return compare(a.verifiedby, b.verifiedby, isAsc);
        case 'verificationDate': return compare(+a.verificationDate, +b.verificationDate, isAsc);
        case 'hotBody': return compare(a.hotBody, b.hotBody, isAsc);
        case 'headache': return compare(+a.headache, +b.headache, isAsc);
        case 'weak': return compare(a.weak, b.weak, isAsc);
        case 'bodyPains': return compare(+a.bodyPains, +b.bodyPains, isAsc);
        case 'nausea': return compare(a.nausea, b.nausea, isAsc);
        case 'vomiting': return compare(+a.vomiting, +b.vomiting, isAsc);
        case 'soreThroat': return compare(a.soreThroat, b.soreThroat, isAsc);
        case 'cough': return compare(+a.cough, +b.cough, isAsc);
        case 'nose': return compare(a.nose, b.nose, isAsc);
        case 'chestPains': return compare(+a.chestPains, +b.chestPains, isAsc);
        case 'breathing': return compare(+a.breathing, +b.breathing, isAsc);
        case 'duration': return compare(a.duration, b.duration, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
