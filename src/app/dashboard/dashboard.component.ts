import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {TaskList} from '../task'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { TodoService } from '../main/shared/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  todolistArray: any[];
  opened = true;
  
  
  constructor(private toDoService: TodoService, private router: Router, private fb: FormBuilder, private db: AngularFireDatabase) {
   
  }

  getContactForm() {
    return this.fb.group({
      title: [''],
      taskTitle: ['', Validators.required],
      desc: ['', Validators.required],
      reminer: [true, Validators.required],
      repeat: ['', Validators.required],
      time: [new Date()],
      subTask: [[]]
    });

  }
  ngOnInit() {
    this.toDoService.gettodolist().snapshotChanges()
      .subscribe(item => {
        this.todolistArray = [
          
        ];
        item.forEach(element => {
          let x = element.payload.toJSON();
         
          x['$key'] = element.key;
          this.todolistArray.push(x);
        });

        // sort array isChecked false -> true
        this.todolistArray.sort((a, b) => {
          return a.isChecked - b.isChecked;


        });
      });
  }
  onAdd(itemTitle) {
    this.toDoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }
  alterCheck($key: string, isChecked) {
    this.toDoService.checkOrUnCheckTitle($key, !isChecked);

  }
  onDelete($key: string) {
    this.toDoService.removeTitle($key);
  }


  goToTask(taskDetails) {
    // get id form task detail using firebase methods\




    
    const id = 2333 //get from from forebase 
    this.router.navigate(['/side-bar/main'], { queryParams: { TaskId: id } })
    // then send id by routing
  }
}
