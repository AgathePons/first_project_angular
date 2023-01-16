import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Answer } from 'src/app/core/models/answer';
import { AnswerService } from 'src/app/core/service/answer.service';

@Component({
  selector: 'app-answer-table',
  templateUrl: './answer-table.component.html',
  styleUrls: ['./answer-table.component.scss']
})
export class AnswerTableComponent implements OnInit {

  public answers: Array<Answer> = [];

  constructor(
    private answerService: AnswerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.answerService.findAll().subscribe((answers: Answer[]) => {
      this.answers = answers;
    })
  }

  public onEdit(answer: Answer): void {
    this.router.navigate(['/', 'answer', 'update', answer.getId()]);
  }

  public onDelete(answer: Answer): void {
    this.answerService.removeOne(answer).subscribe({
      next: (_response: HttpResponse<any>) => {
        this.answers.splice(
          this.answers.findIndex((s: Answer) => s.getId() === answer.getId()),
          1
        )

      },
      error: (error: any) => {
        // Something went wrong, deal with it
      }

    })
  }

}
