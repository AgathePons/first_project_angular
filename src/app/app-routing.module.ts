import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerFormComponent } from './answer/components/answer-form/answer-form.component';
import { AnswerTableComponent } from './answer/components/answer-table/answer-table.component';
import { AnswerResolver } from './answer/resolver/answer.resolver';
import { GoogleMainPageComponent } from './google/components/google-main-page/google-main-page.component';
import { PoeAddStagiaireComponent } from './poe/components/poe-add-stagiaire/poe-add-stagiaire.component';
import { PoeDetailsComponent } from './poe/components/poe-details/poe-details.component';
import { PoeFormComponent } from './poe/components/poe-form/poe-form.component';
import { PoeTableComponent } from './poe/components/poe-table/poe-table.component';
import { PoeResolver } from './poe/resolvers/poe.resolver';
import { QuestionFormComponent } from './question/components/question-form/question-form.component';
import { QuestionTableComponent } from './question/components/question-table/question-table.component';
import { QuestionResolver } from './question/resolver/question.resolver';
import { StagaireFormComponent } from './stagiaires/components/stagaire-form/stagaire-form.component';
import { StagiaireDetailComponent } from './stagiaires/components/stagiaire-detail/stagiaire-detail.component';
import { StagiaireTableComponent } from './stagiaires/components/stagiaire-table/stagiaire-table.component';
import { StagiaireTestComponent } from './stagiaires/components/stagiaire-test/stagiaire-test.component';
import { StagiaireResolver } from './stagiaires/resolvers/stagiaire.resolver';
import { SurveyAddQuestionComponent } from './survey/components/survey-add-question/survey-add-question.component';
import { SurveyDetailsComponent } from './survey/components/survey-details/survey-details.component';
import { SurveyFormComponent } from './survey/components/survey-form/survey-form.component';
import { SurveyTableComponent } from './survey/components/survey-table/survey-table.component';
import { SurveyResolver } from './survey/resolvers/survey.resolver';
import { GoogleTokenFormComponent } from './user/google/google-token-form/google-token-form.component';
import { HasUserGuard } from './user/guards/has-user.guard';
import { NoUserGuard } from './user/guards/no-user.guard';
import { LoginFormComponent } from './user/login/login-form/login-form.component';
import { SignupComponent } from './user/signup/signup/signup.component';

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'login', // redirection to another path
      pathMatch: 'full', // check all the route (not just one section)
    },
    {
      path: 'signup',
      component: SignupComponent,
      canActivate: [
        NoUserGuard
      ]
    },
    {
      path: 'login',
      component: LoginFormComponent,
      canActivate: [
        NoUserGuard,
      ]
    },
    {
      path: 'home',
      component: StagiaireTableComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'googletoken',
      component: GoogleTokenFormComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'googlepage',
      component: GoogleMainPageComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'test',
      component: StagiaireTestComponent
    },
    {
      path: 'poes',
      component: PoeTableComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'poe/detail/:id',
      component: PoeDetailsComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'poe/add',
      component: PoeFormComponent,
      resolve: { form: PoeResolver },
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'poe/update/:id',
      component: PoeFormComponent,
      resolve: { form: PoeResolver},
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'poe/addStagiaires/:id',
      component: PoeAddStagiaireComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'stagiaire/add',
      component: StagaireFormComponent,
      resolve: { form: StagiaireResolver },
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'stagiaire/:id', // parametrized route
      component: StagiaireDetailComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'stagiaire/update/:id',
      component: StagaireFormComponent,
      resolve: { form: StagiaireResolver },
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'surveys',
      component: SurveyTableComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'survey/detail/:id',
      component: SurveyDetailsComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'survey/add',
      component: SurveyFormComponent,
      resolve: { form: SurveyResolver },
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'survey/addQuestions/:id',
      component: SurveyAddQuestionComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'survey/update/:id',
      component: SurveyFormComponent,
      resolve: { form: SurveyResolver},
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'questions',
      component: QuestionTableComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'question/add',
      component: QuestionFormComponent,
      resolve: { form: QuestionResolver },
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'question/update/:id',
      component: QuestionFormComponent,
      resolve: { form: QuestionResolver },
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'answers',
      component: AnswerTableComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'answer/add',
      component: AnswerFormComponent,
      resolve: { form: AnswerResolver },
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'answer/update/:id',
      component: AnswerFormComponent,
      resolve: { form: AnswerResolver},
      canActivate: [
        HasUserGuard
      ]
    },
    // must be the last route of the list
    {
      path: '**', // wild card
      redirectTo: 'home',
      pathMatch: 'full',
    }
  ];
}
