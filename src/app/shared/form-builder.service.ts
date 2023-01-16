
import { Inject, Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

import { Stagiaire } from 'src/app/core/models/stagiaire';
import { Answer } from '../core/models/answer';
import { Poe } from '../core/models/poe';
import { Question } from '../core/models/question';
import { Survey } from '../core/models/survey';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  private form!: FormGroup;
  private stagiaire: Stagiaire = new Stagiaire();
  private poe: Poe = new Poe();
  private survey: Survey = new Survey();
  private answer: Answer = new Answer();
  private question: Question = new Question();
  private updateMode: boolean = false;

  constructor(

    private formBuilder: FormBuilder,
    private adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private locale: string
  ) {
    this.locale = 'fr';
    this.adapter.setLocale(this.locale);
  }

  public getForm(): FormGroup {
    return this.form;
  }

  public build(stagiaire: Stagiaire): FormBuilderService {
    this.stagiaire = stagiaire;
    if (stagiaire.getId() !== 0) {
      this.updateMode = true;
    }

    this.form = this.formBuilder.group({
      lastName: [
        this.stagiaire.getLastName(), // default alue
        [Validators.required]
      ],
      firstName: [
        this.stagiaire.getFirstName(),
        [Validators.required]
      ],
      email: [
        this.stagiaire.getEmail(),
        [Validators.required, Validators.email]
      ],
      phoneNumber: [
        this.stagiaire.getPhoneNumber(),
        [Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")]
      ],
      birthDate: [
        this.stagiaire.getBirthDate(),
      ]
    });
    // Add a control with id value so form.value = {id: 1, ...}
    if(this.updateMode) {
      const idControl: AbstractControl = new FormControl(this.stagiaire.getId())
      this.form.addControl('id', idControl);
    }
    return this;
  }

  public buildPoe(poe: Poe): FormBuilderService {
    this.poe = poe;
    if (poe.getId() !== 0) {
      this.updateMode = true;
    }

    this.form = this.formBuilder.group({
      title: [
        this.poe.getTitle(),
        [Validators.required]
      ],
      beginDate: [
        this.poe.getBeginDate(),
        [Validators.required]
      ],
      endDate: [
        this.poe.getEndDate(),
        [Validators.required]
      ],
      type: [
        this.poe.getType(),
        [Validators.required]
      ]
    });

    // Add a control with id value so form.value = {id: 1, ...}
    if(this.updateMode) {
      const idControl: AbstractControl = new FormControl(this.poe.getId());
      this.form.addControl('id', idControl);
    }

    return this;
  }

  public buildSurvey(survey: Survey): FormBuilderService {
    this.survey = survey;
    if (survey.getId() !== 0) {
      this.updateMode = true;
    }
    this.form = this.formBuilder.group({
      title: [
        this.survey.getTitle(),
        [Validators.required]
      ],
      level: [
        this.survey.getLevel(),
        [Validators.required]
      ],
      poeType: [
        this.survey.getPoeType()
      ],
    });

    if(this.updateMode) {
      const idControl: AbstractControl = new FormControl(this.survey.getId());
      this.form.addControl('id', idControl);
    }

    return this;
  }

  public buildQuestion(question: Question): FormBuilderService {
    this.question = question;
    if (question.getId() !== 0) {
      this.updateMode = true;
    }
    this.form = this.formBuilder.group({
      text: [
        this.question.getText(),
        [Validators.required]
      ],
      answerType: [
        this.question.getAnswerType(),
        [Validators.required]
      ],
    });

    if(this.updateMode) {
      const idControl: AbstractControl = new FormControl(this.question.getId());
      this.form.addControl('id', idControl);
    }

    return this;
  }

   public buildAnswer(answer: Answer): FormBuilderService {
    this.answer = answer;
    if (answer.getId() !== 0) {
      this.updateMode = true;
    }
    this.form = this.formBuilder.group({
      text: [
        this.answer.getText(),
        [Validators.required]
      ],
    });

    if(this.updateMode) {
      const idControl: AbstractControl = new FormControl(this.answer.getId());
      this.form.addControl('id', idControl);
    }

    return this;
  }
}
