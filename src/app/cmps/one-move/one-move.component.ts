import { Component, Input, OnInit } from '@angular/core';
import { Move } from 'src/app/models/move.model';

@Component({
  selector: 'one-move',
  templateUrl: './one-move.component.html',
  styleUrls: ['./one-move.component.scss']
})
export class OneMoveComponent implements OnInit {
  @Input() move:Move
  @Input() title:string
  constructor() { }

  ngOnInit(): void {
  }

}
