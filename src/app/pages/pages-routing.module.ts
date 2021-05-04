import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminGuard } from './../auth/admin.guard';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'access-log',
      loadChildren: () => import('./access-log/access-log.module')
      .then(m => m.AccessLogModule)
    },
    {
      path: 'badges',
      loadChildren: () => import('./badges/badges.module')
      .then(m => m.BadgesModule)
    },
    {
      path: 'questionnaires',
      loadChildren: () => import('./questionnaires/questionnaires.module')
      .then(m => m.QuestionnairesModule)
    },
    {
      path: 'employees',
      loadChildren: () => import('./employees/employees.module')
      .then(m => m.EmployeesModule),
      canActivate: [AdminGuard]
    },
    {
      path: 'company',
      loadChildren: () => import('./company/company.module')
      .then(m => m.CompanyModule),
      canActivate: [AdminGuard]
    },
    {
      path: '',
      redirectTo: 'bookings',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
},





  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
