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
  subTaskListArray = [];
  opened = false;
  
 task:any;
  
TaskIdFromURL: number;




  constructor(private toDoService: TodoService, private route: ActivatedRoute, private location: Location, private db: AngularFireDatabase) {
   
   
  }

  ngOnInit() {

    // get taskid from url
  this.route.queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.TaskIdFromURL = +params['TaskId'] || 0;
      console.log(this.TaskIdFromURL);
      
    });


// get task by task id from firebase 
this.getTaskFromListById();

// below function can't use becouse its get main task list from firebase database 
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
  getTaskFromListById(): void {

   this.task = this.toDoService.getTaskById(this.TaskIdFromURL);
      // .subscribe(taskList=> this.taskList= taskList);

      // console the task to veryfiy task 
      console.log( this.task);
      
  }

  goBack(): void {
    this.location.back();
  }

  

 
  

}

