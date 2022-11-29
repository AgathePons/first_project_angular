import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StagiaireTableComponent } from './stagiaires/components/stagiaire-table/stagiaire-table.component';

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'home', // redirection to another path
      pathMatch: 'full', // check all the route (not just one section)
    },
    {
      path: 'home',
      component: StagiaireTableComponent,
    },
    // must be the last route of the list
    {
      path: '**', // wild card
      redirectTo: 'home',
      pathMatch: 'full',
    }
  ];
}
