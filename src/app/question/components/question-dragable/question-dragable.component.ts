import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/core/models/question';
import { QuestionService } from 'src/app/core/service/question.service';
import {CdkDragDrop, CdkDragEnd, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-question-dragable',
  templateUrl: './question-dragable.component.html',
  styleUrls: ['./question-dragable.component.scss']
})
export class QuestionDragableComponent implements OnInit {

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

  drop(event: CdkDragDrop<Question[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  dragEnd($event: CdkDragEnd) {
    console.log($event.source.getFreeDragPosition());
}

  

}
