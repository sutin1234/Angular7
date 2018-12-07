import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CdkDragStart, CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.css']
})
export class DropComponent implements OnInit {
  state: any;
  position: any;

  items= [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4'
  ]
  constructor() { }

  ngOnInit() {
    //console.log(this.items);
  }
  dragStarted($event: CdkDragStart){
    //console.log('DragStarted. ', $event);
  }
  dragEnded($event: CdkDragEnd){
    //console.log('DragEnd. ', $event);
  }
  dragMoved($event: CdkDragMove){
    //console.log('DragMoved. ', $event);
  }


}
