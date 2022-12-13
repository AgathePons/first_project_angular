import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StagiaireTableComponent } from './stagiaires/components/stagiaire-table/stagiaire-table.component';
import { StagiaireFilterComponent } from './stagiaires/components/stagiaire-filter/stagiaire-filter.component';
import { InitialsPipe } from './shared/pipes/initials.pipe';
import { StagiaireDetailComponent } from './stagiaires/components/stagiaire-detail/stagiaire-detail.component';
import { BubbleDirective } from './shared/directives/bubble.directive';

import { HttpClientModule } from '@angular/common/http';
import { StagaireFormComponent } from './stagiaires/components/stagaire-form/stagaire-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { PoeTableComponent } from './poe/components/poe-table/poe-table.component';

import { PoeFilterComponent } from './poe/components/poe-filter/poe-filter.component';

import { PoeFormComponent } from './poe/components/poe-form/poe-form.component';
import { UserModule } from './user/user.module';
import { AppInitializerService } from './core/service/app-initializer.service';

export function initializeApp1(appInitService: AppInitializerService) {
  return (): Promise<any> => {
    return appInitService.Init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    StagiaireTableComponent,
    StagiaireFilterComponent,
    InitialsPipe,
    StagiaireDetailComponent,
    BubbleDirective,
    StagaireFormComponent,
    PoeTableComponent,

    PoeFilterComponent,

    PoeFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    UserModule,
  ],
  providers: [
    AppInitializerService,
    { provide: APP_INITIALIZER,useFactory: initializeApp1, deps: [AppInitializerService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
