import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { TodoService } from '../main/shared/todo.service';
import { TaskList } from '../task';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  todolistArray: any[];
  opened = true;
  itemName = '';
  itemDueDate = '';
  itemRepeat = '';
  itemMessage = '';
  items: Observable<any[]>;
  contactForm: FormGroup;
  showAddTask = false;
  taskList = TaskList;
  subtask = [];
  subValue = '';
  constructor(private toDoService: TodoService, private fb: FormBuilder, private db: AngularFireDatabase) {
    this.items = db.list('messages').valueChanges();
    this.contactForm = this.getContactForm();
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
        this.todolistArray = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          // tslint:disable-next-line:no-string-literal
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


  onSubmit() {
    this.db.list('/messages').push(this.contactForm.value);
    console.log(this.contactForm.value);
    this.taskList.push(this.contactForm.value);
    this.clearForm();
  }

  clearForm() {
    this.contactForm.reset();
    this.showAddTask = false;
  }

  editTask(val) {
    if (val !== null) {

      this.contactForm.patchValue(val);
      this.subtask = val.subTask;
    }
    this.showAddTask = true;
  }

  removeTask(i) {
    this.taskList.splice(i, 1);
  }
  removeSubTask(i) {
    this.subtask.splice(i, 1);
  }
  addSubTAsk(value) {
    this.subtask.push(value);
    this.subValue = '';
  }
}
