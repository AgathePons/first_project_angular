import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/core/models/question';
import { QuestionService } from 'src/app/core/service/question.service';

@Component({
  selector: 'app-question-table',
  templateUrl: './question-table.component.html',
  styleUrls: ['./question-table.component.scss']
})
export class QuestionTableComponent implements OnInit {

  public questions: Array<Question> = [];

  constructor(
    private questionService: QuestionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.questionService.findAll().subscribe((questions: Question[]) => {
      this.questions = questions;
    })
  }

}
