import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiuComponent } from './fiu/fiu.component';
import { HomeLoanComponent } from './homeloan/homeloan.component';
import { AccountAggregatorComponent } from './account-aggregator/account-aggregator.component';


const routes: Routes = [
  { path: '', redirectTo: 'details', pathMatch: 'full' },
  { path: 'fiu', component: FiuComponent },
  { path: 'details', component: HomeLoanComponent },
  { path: 'accountaggregator', component: AccountAggregatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
