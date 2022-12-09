import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoeFormComponent } from './poe/components/poe-form/poe-form.component';
import { PoeResolver } from './poe/resolvers/poe.resolver';
import { StagaireFormComponent } from './stagiaires/components/stagaire-form/stagaire-form.component';
import { StagiaireDetailComponent } from './stagiaires/components/stagiaire-detail/stagiaire-detail.component';
import { StagiaireTableComponent } from './stagiaires/components/stagiaire-table/stagiaire-table.component';
import { StagiaireResolver } from './stagiaires/resolvers/stagiaire.resolver';

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


    {
      path: 'stagiaire/add',
      component: StagaireFormComponent,
      resolve: { form: StagiaireResolver },
    },
    {
      path: 'stagiaire/:id', // parametrized route
      component: StagiaireDetailComponent,
    },
    {
      path: 'stagiaire/update/:id',
      component: StagaireFormComponent,
      resolve: { form: StagiaireResolver },
    },
    {
      path: 'poe/add',
      component: PoeFormComponent,
      resolve: { form: PoeResolver },
    },
    {
      path: 'poe/update/:id',
      component: PoeFormComponent,
      resolve: { form: PoeResolver},
    },
    // must be the last route of the list
    {
      path: '**', // wild card
      redirectTo: 'home',
      pathMatch: 'full',
    }
  ];
}
