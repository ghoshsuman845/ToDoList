import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { TodoService } from './shared/todo.service';
import { TaskList } from '../task';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [TodoService]
})
export class MainComponent implements OnInit {
  @Input()  taskList = TaskList;
  subTaskListArray: any[];
  opened = false;
  
 
  





  constructor(private toDoService: TodoService, private route: ActivatedRoute, private location: Location, private db: AngularFireDatabase) {
   
   
  }

  ngOnInit() {
    this.toDoService.getsubTaskList().snapshotChanges()
      .subscribe(item => {
        this.subTaskListArray = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          
          x['$key'] = element.key;
          this.subTaskListArray.push(x);
        });

        // sort array isChecked false -> true
        this.subTaskListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;


        });
      });
    this.getTaskList();
  }
  onAdd(itemSubTitle) {
    this.toDoService.addSubTitle(itemSubTitle.value);
    itemSubTitle.value = null;
  }
  alterCheck($key: string, isChecked) {
    this.toDoService.checkOrUnCheckSubTitle($key, !isChecked);

  }
  onDelete($key: string) {
    this.toDoService.removeSubTitle($key);
  }
  getTaskList(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.toDoService.getTaskList(id)
      .subscribe(taskList=> this.taskList= taskList);
  }

  goBack(): void {
    this.location.back();
  }

  

 
  

}

