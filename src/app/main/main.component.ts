import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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
 
  subTaskListArray: any[];
  opened = false;
  showAddTask = false;
  taskList = TaskList;
  subtask = [];
  subValue = '';
 




  constructor(private toDoService: TodoService, private fb: FormBuilder, private db: AngularFireDatabase) {
   
   
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

  

  removeTask(i) {
    this.taskList.splice(i, 1);
  }
  removeSubTask(i) {
    this.subtask.splice(i, 1);
  }
  addSubTask(value) {
    this.subtask.push(value);
    this.subValue = '';
  }
  

}

