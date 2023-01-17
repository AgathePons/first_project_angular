import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StagiaireTableComponent } from './stagiaires/components/stagiaire-table/stagiaire-table.component';
import { StagiaireFilterComponent } from './stagiaires/components/stagiaire-filter/stagiaire-filter.component';
import { InitialsPipe } from './shared/pipes/initials.pipe';
import { StagiaireDetailComponent } from './stagiaires/components/stagiaire-detail/stagiaire-detail.component';
import { BubbleDirective } from './shared/directives/bubble.directive';

import { StagaireFormComponent } from './stagiaires/components/stagaire-form/stagaire-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { PoeTableComponent } from './poe/components/poe-table/poe-table.component';

import { PoeFilterComponent } from './poe/components/poe-filter/poe-filter.component';

import { PoeFormComponent } from './poe/components/poe-form/poe-form.component';
import { UserModule } from './user/user.module';
import { userInterceptor } from './core/interceptors/user-interceptor.interceptor';
import { PoeDetailsComponent } from './poe/components/poe-details/poe-details.component';
import { StagiairePoeFormComponent } from './stagiaires/components/stagiaire-poe-form/stagiaire-poe-form.component';
import { PoeAddStagiaireComponent } from './poe/components/poe-add-stagiaire/poe-add-stagiaire.component';
import { SurveyTableComponent } from './survey/components/survey-table/survey-table.component';
import { SurveyFormComponent } from './survey/components/survey-form/survey-form.component';
import { StagiaireTestComponent } from './stagiaires/components/stagiaire-test/stagiaire-test.component';
import { SearchFilterPipe } from './shared/pipes/search-filter.pipe';
import { FormsModule } from '@angular/forms';
import { SurveyDetailsComponent } from './survey/components/survey-details/survey-details.component';
import { AnswerTableComponent } from './answer/components/answer-table/answer-table.component';
import { AnswerFormComponent } from './answer/components/answer-form/answer-form.component';
import { QuestionTableComponent } from './question/components/question-table/question-table.component';
import { QuestionFormComponent } from './question/components/question-form/question-form.component';
import { GoogleMainPageComponent } from './google/components/google-main-page/google-main-page.component';
import { SurveyAddQuestionComponent } from './survey/components/survey-add-question/survey-add-question.component';

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
    PoeDetailsComponent,
    StagiairePoeFormComponent,
    PoeAddStagiaireComponent,
    SurveyTableComponent,
    SurveyFormComponent,
    StagiaireTestComponent,
    SearchFilterPipe,
    SurveyDetailsComponent,
    AnswerTableComponent,
    AnswerFormComponent,
    QuestionTableComponent,
    QuestionFormComponent,
    GoogleMainPageComponent,
    SurveyAddQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    UserModule,
    FormsModule
  ],
  providers: [
    userInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
