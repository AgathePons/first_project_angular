import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/core/models/question';
import { QuestionService } from 'src/app/core/service/question.service';
import { HttpResponse } from '@angular/common/http';

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

  public onEdit(question: Question): void {
    this.router.navigate(['/', 'question', 'update', question.getId()]);
  }


  public onDelete(question: Question): void {
    console.log('called onDelete');
    
    this.questionService.removeOne(question).subscribe({
      next: (_response: HttpResponse<any>) => {
        this.questions.splice(
          this.questions.findIndex((s: Question) => s.getId() === question.getId()),
          1
        )

      },
      error: (error: any) => {
        // Something went wrong, deal with it
      }

    })
  }

}
